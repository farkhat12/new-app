import "server-only";
import { cache } from "react";
import { serverApi } from "@/lib/api/server-api";
import { User } from "../types/register.types";

export const getUser = cache(async (): Promise<User | null> => {
  try {
    const { data } = await serverApi.get<{ success: boolean; data: User }>(
      "/users/me",
    );

    return data.data;
  } catch {
    return null;
  }
});
