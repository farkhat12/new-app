import "server-only";
import { redis } from "./redis";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { keys } from "./auth/keys";
import { api } from "./api/axios";
import { isAxiosError } from "axios";

const isProd = process.env.NODE_ENV === "production";
export const COOKIE_NAME = isProd ? "__Host-sid" : "sid";
const ACCESS_SKEW = 30;

export interface TokenPairResponse {
  access_token: string;
  refresh_token: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

export async function createSession(tokens: TokenPairResponse) {
  const sid = crypto.randomBytes(32).toString("base64url");

  const refreshTtl = Math.floor(tokens.refreshExpiresIn);
  if (!Number.isFinite(refreshTtl) || refreshTtl <= 0) {
    throw new Error("Invalid refresh token TTL");
  }
  const accessTtl = Math.floor(tokens.accessExpiresIn) - ACCESS_SKEW;

  if (accessTtl > 0) {
    await redis.set(keys.access(sid), tokens.access_token, "EX", accessTtl);
  }
  const jar = await cookies();

  const oldSid = jar.get(COOKIE_NAME)?.value;
  if (oldSid) {
    await redis.del(keys.refresh(oldSid), keys.access(oldSid));
  }

  const pipeline = redis.multi();
  pipeline.set(keys.refresh(sid), tokens.refresh_token, "EX", refreshTtl);

  if (accessTtl > 0) {
    pipeline.set(keys.access(sid), tokens.access_token, "EX", accessTtl);
  }

  const results = await pipeline.exec();
  if (results?.some(([err]) => err)) {
    throw new Error("Failed to persist session");
  }

  jar.set(COOKIE_NAME, sid, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: refreshTtl,
  });
}

export async function getAccessToken(): Promise<string | null> {
  const jar = await cookies();
  const sid = jar.get(COOKIE_NAME)?.value;
  if (!sid) return null;

  const accessToken = await redis.get(keys.access(sid));
  if (accessToken) return accessToken;

  try {
    const refreshToken = await redis.get(keys.refresh(sid));
    if (!refreshToken) return null;

    const { data } = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });

    const refreshTtl = Math.floor(data.refreshExpiresIn);
    const accessTtl = Math.floor(data.accessExpiresIn) - ACCESS_SKEW;

    const m = redis.multi();
    m.set(keys.refresh(sid), data.refresh_token, "EX", refreshTtl);
    if (accessTtl > 0) {
      m.set(keys.access(sid), data.access_token, "EX", accessTtl);
    }
    await m.exec();

    return data.access_token;
  } catch (err) {
    if (isAxiosError(err)) {
      const status = err.response?.status;
      if (status === 400 || status === 401 || status === 403) {
        // Refresh token жарамсыз: сессияны толық тазалаймыз
        await redis.del(keys.refresh(sid), keys.access(sid));
        return null;
      }
    }
    // Желі қатесі, timeout, 5xx: сессияны өшірмейміз, кейін қайта көреміз
    console.error("Token refresh failed", err);
    return null;
  }
}

export async function logout() {
  const jar = await cookies();
  const sid = jar.get(COOKIE_NAME)?.value;
  if (sid) {
    try {
      const refreshToken = await redis.get(keys.refresh(sid));

      // 1. Backend-те revoke (сәтсіз болса да жалғастырамыз)
      if (refreshToken) {
        try {
          await api.post("/auth/logout", {
            refresh_token: refreshToken,
          });
        } catch (err) {
          console.error("Backend revoke failed", err);
        }
      }
    } finally {
      await redis.del(keys.refresh(sid), keys.access(sid));
    }
  }

  jar.delete(COOKIE_NAME);
}
