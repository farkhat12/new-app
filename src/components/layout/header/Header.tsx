"use server";
import { HeaderAvatar } from "./Avatar";
import { getUser } from "@/features/auth/api/get-user.ts";
import Link from "next/link";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40 h-13 shrink-0 border-b flex bg-white items-center justify-between border-gray-200 p-2">
      <div />
      <div />
      {user ? (
        <HeaderAvatar user={user} />
      ) : (
        <Link
          href="/login"
          className="inline-block rounded-md bg-primary px-3.5 py-1 text-primary-foreground"
        >
          Kirish
        </Link>
      )}
    </header>
  );
}
