import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) redirect("/login");

  const res = await fetch(`${process.env.API_URL}${path}`, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 401) redirect("/login");
  if (!res.ok) throw new Error(`API ${res.status} ${path}`);

  const json = await res.json();
  return (json.data ?? json) as T;
}

export type Me = { id: string; name: string; phone: string; role: string };

// бір render ішінде бірнеше рет шақырса да, сұрау бір ғана кетеді
export const getMe = cache(() => apiFetch<Me>("/users/me"));
