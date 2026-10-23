"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import Link from "next/link";
import { useUIStore } from "@/stores/ui.store";
import { User } from "@/features/auth/types/register.types";

export function HeaderAvatar({ user }: { user: User | null }) {
  const openModal = useUIStore((store) => store.openModal);
  const name: string =
    user?.name[0].toLocaleUpperCase() + "" + user?.name.slice(1);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-9 flex items-center gap-2">
        <span>{name}</span>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?semt=ais_hybrid&w=740&q=80" />
          <AvatarFallback>{user?.name[0].toLocaleUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <Link href={"/profile"}>
          <DropdownMenuItem className="h-8 cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="text-red-500 hover:bg-red-400 h-8 cursor-pointer"
          onClick={() => openModal("logout")}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
