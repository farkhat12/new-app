"use server";
import { cookies } from "next/headers";
import { accessOpts, refreshOpts } from "@/lib/auth-cookies";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schema/login.schema";

type LoginResult =
  | { ok: true }
  | { ok: false; status: "invalid" | "error"; message: string };

export async function loginAction(
  values: LoginFormValues,
): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, status: "invalid", message: "Invalid data" };
  }

  let res: Response;
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data), // { phone, password }
      cache: "no-store",
    });
  } catch {
    return { ok: false, status: "error", message: "Server is not reachable" };
  }

  if (res.status === 401) {
    return {
      ok: false,
      status: "invalid",
      message: "Invalid phone or password",
    };
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(
      "LOGIN FAILED",
      res.status,
      text,
      `${process.env.API_URL}/auth/login`,
    );
    return {
      ok: false,
      status: "error",
      message: `Something went wrong (${res.status})`,
    };
  }

  const data = await res.json();
  const { access_token, refresh_token } = data.data ?? data;

  if (!access_token || !refresh_token) {
    console.error("LOGIN: tokens missing", data);
    return { ok: false, status: "error", message: "Invalid server response" };
  }

  //   const { accessToken, refreshToken } = await res.json();
  const store = await cookies();
  store.set("access_token", access_token, accessOpts);
  store.set("refresh_token", refresh_token, refreshOpts);

  return { ok: true };
}

export async function logoutAction() {
  const store = await cookies();
  store.delete("access_token");
  store.delete("refresh_token");
}
