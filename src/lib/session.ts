import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
import { redis } from "./redis";
import { keys } from "./auth/keys";
import { Tokens } from "./auth/types";

export async function createSession(data: Tokens) {
  const sid = randomBytes(32).toString("base64url");

  await redis
    .multi()
    .set(keys.access(sid), data.access_token, "EX", data.accessExpiresIn)
    .set(keys.refresh(sid), data.refresh_token, "EX", data.refreshExpiresIn)
    .exec();

  return sid;
}

export async function getAccessToken() {
  const sid = (await cookies()).get("sid")?.value;
  if (!sid) return null;
  return await redis.get(keys.access(sid));
}

export async function getSession(sid: string) {
  const [access_token, refresh_token] = await redis.mget(
    keys.access(sid),
    keys.refresh(sid),
  );
  return { access_token, refresh_token };
}

export async function destroySession(sid: string) {
  await redis.del(keys.access(sid), keys.refresh(sid));
}

export async function updateSession(sid: string, data: Tokens) {
  await redis
    .multi()
    .set(keys.access(sid), data.access_token, "EX", data.accessExpiresIn)
    .set(keys.refresh(sid), data.refresh_token, "EX", data.refreshExpiresIn)
    .exec();

  return sid;
}
