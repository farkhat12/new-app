"use server";
import { api } from "@/lib/api/axios";
import { LoginFormValues, loginSchema } from "../schema/login.schema";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SID_COOKIE, sidCookieOptions } from "@/lib/auth/cookie-config";
import { createSession } from "@/lib/session";

export const loginAction = async (values: LoginFormValues) => {
  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Дұрыс емес деректер" };
  }

  try {
    const { data } = await api.post("/auth/login", parsed.data);

    console.log(data.data);
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      return { ok: false, error: "Phone or password wwrong" };
    }
    console.error("Login failed", e);
    return { ok: false, error: "Қате шықты, кейінірек қайталаңыз" };
  }
  // redirect("/apartments");
};
