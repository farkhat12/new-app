import type { AxiosError } from "axios";
import { destroySession, getSession, updateSession } from "../session";
import { api } from "../api/axios";

const EXPIRY_SKEW_MS = 40_000;

function isExpired(token: string) {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString(),
    );
    return payload.exp * 1000 < Date.now() + EXPIRY_SKEW_MS;
  } catch {
    return true;
  }
}

export type EnsureResult =
  | { status: "valid" }
  | { status: "refreshed"; maxAge?: number }
  | { status: "logout" }
  | { status: "error" };

type RefreshResult = Exclude<EnsureResult, { status: "valid" }>;

async function doRefresh(
  sid: string,
  refresh_token: string,
): Promise<RefreshResult> {
  try {
    const { data } = await api.post(
      "/auth/refresh",
      { refresh_token },
      { timeout: 5000 },
    );
    const userData = data?.data;
    if (!userData) return { status: "logout" };

    await updateSession(sid, userData);
    return { status: "refreshed", maxAge: userData.refreshExpiresIn };
  } catch (e) {
    const code = (e as AxiosError).response?.status;
    return code && code >= 400 && code < 500
      ? { status: "logout" }
      : { status: "error" };
  }
}

const inflight = new Map<string, Promise<RefreshResult>>();

function refreshOnce(sid: string, refresh_token: string) {
  let p = inflight.get(sid);
  if (!p) {
    p = doRefresh(sid, refresh_token).finally(() => inflight.delete(sid));
    inflight.set(sid, p);
  }
  return p;
}

export async function ensureFreshSession(sid: string): Promise<EnsureResult> {
  const session = await getSession(sid);
  if (!session) return { status: "logout" };

  const { access_token, refresh_token } = session;
  if (access_token && !isExpired(access_token)) return { status: "valid" };
  if (!refresh_token) return { status: "logout" };

  return refreshOnce(sid, refresh_token);
}

export async function endSession(sid: string) {
  await destroySession(sid).catch(() => {});
}
