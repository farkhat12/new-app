"use server";
import { logout } from "@/lib/session";

export async function logoutAction() {
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed", error);
  }
}
