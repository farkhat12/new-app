"use server";
import { HeaderAvatar } from "./Avatar";
import { getUser } from "@/features/auth/api/get-user.ts";
import { Button } from "@/shared/ui/button";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40 h-13 shrink-0 border-b flex bg-white items-center justify-between border-gray-200 p-2">
      <div />
      <div />
      {user ? <HeaderAvatar user={user} /> : <Button>Login</Button>}
    </header>
  );
}
