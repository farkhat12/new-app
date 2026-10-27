import { cache } from "react";
import { serverApiGet, ApiError } from "@/lib/api/server-api";
import { User } from "../types/register.types";
import { cookies } from "next/headers";

export const getUser = cache(async (): Promise<User | null> => {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) return null;
  try {
    const response = await serverApiGet<{
      success: boolean;
      data: User;
    }>("/api/users/me");

    return response.data;
  } catch (error: any) {
    if (error instanceof ApiError && error.status === 401) {
      return null; // genuinely unauthenticated
    }
    console.error("getUser failed:", error);
    throw error; // let error.tsx handle real failures
  }
});
