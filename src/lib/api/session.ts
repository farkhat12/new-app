// lib/session.ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUser = cache(async () => {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) redirect("/login");

  const res = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: {
      Authorization: `access_token=${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) redirect("/login");
  return res.json();
});
