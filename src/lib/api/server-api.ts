"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function serverApi(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  console.log("jjj");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Cookie: `access_token=${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`API қатесі: ${res.statusText} (${endpoint})`);
  }

  return res.json();
}
