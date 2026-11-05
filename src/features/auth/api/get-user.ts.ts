import "server-only";
import { cache } from "react";
import { serverApiGet, UnauthenticatedError } from "@/lib/api/server-api";
import { User } from "../types/register.types";
import { isAxiosError } from "axios";
import { unstable_rethrow } from "next/navigation";

import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/session";

export const getUser = cache(async (): Promise<User | null> => {
  const jar = await cookies();
  if (!jar.get(COOKIE_NAME)?.value) return null;

  try {
    const response = await serverApiGet<{ success: boolean; data: User }>(
      "/users/me",
    );
    if (!response.success || !response.data) return null;
    return response.data;
  } catch (error: unknown) {
    unstable_rethrow(error);

    if (error instanceof UnauthenticatedError) return null;

    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 403) return null;
    }

    console.error("getUser failed", error);
    throw error;
  }
});
