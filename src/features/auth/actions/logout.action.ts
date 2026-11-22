"use server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/proxy";
import { cookies } from "next/headers";

export async function logoutAction() {
  const cookie = await cookies();
  cookie.delete(ACCESS_TOKEN_COOKIE);
  cookie.delete(REFRESH_TOKEN_COOKIE);
}
