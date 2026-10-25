import "server-only";

import type { User } from "../types/register.types";
import { serverApiGet } from "@/lib/api/server-api";

export async function getUser(): Promise<User | null> {
  try {
    return await serverApiGet<User>("/users/me");
  } catch {
    return null;
  }
}
