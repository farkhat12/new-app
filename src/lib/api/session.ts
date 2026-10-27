import "server-only";
import { cookies } from "next/headers";
import { UserRole } from "@/features/auth/types/register.types";
import { getUser } from "@/features/auth/api/get-user.ts";
import { redirect } from "next/navigation";

export const ACCESS_COOKIE = "access_token";
export const REFRESH_COOKIE = "refresh_token";

const base = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const accessCookieOptions = { ...base, maxAge: 14 * 60 };
export const refreshCookieOptions = { ...base, maxAge: 7 * 24 * 60 * 60 };

export async function setSession(accessToken: string, refreshToken: string) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, accessCookieOptions);
  store.set(REFRESH_COOKIE, refreshToken, refreshCookieOptions);
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

export async function requireUser(role?: UserRole) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (role && user.role !== role) {
    redirect("/");
  }

  return user;
}
