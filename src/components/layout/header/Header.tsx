"use client";

import { User } from "@/features/auth/types/register.types";
import { HeaderAvatar } from "./Avatar";

export default function Header() {
  const user: User = {
    id: "hd83by4bdy",
    name: "Farkhat",
    phone: "998936142724",
    role: "user",
    createdAt: "s",
  };
  return (
    <header className="shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-40 h-13 shrink-0 border-b flex bg-white items-center justify-between border-gray-200 p-2">
      <div />
      <div />
      <HeaderAvatar user={user} />
    </header>
  );
}
