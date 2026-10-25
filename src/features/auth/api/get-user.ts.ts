import "server-only";

import { cache } from "react";
import type { User } from "../types/register.types";
import { serverApiGet } from "@/lib/api/server-api";

export const getUser = cache(async (): Promise<User | null> => {
  try {
    return await serverApiGet<User>("/users/me");
  } catch {
    return null;
  }
});
