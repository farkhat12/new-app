"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { ChevronDown, UserRound, LogOut } from "lucide-react";
import Link from "next/link";
import { useUIStore } from "@/stores/ui.store";
import { User } from "@/features/auth/types/register.types";

export function HeaderAvatar({ user }: { user: User | null }) {
  const openModal = useUIStore((store) => store.openModal);

  const name = user?.name
    ? user.name.charAt(0).toLocaleUpperCase() + user.name.slice(1)
    : "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="group cursor-pointer flex items-center gap-2 rounded-full border border-transparent
        p-1 outline-none transition-all duration-200
         hover:bg-muted/60
        focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="max-w-28 truncate text-sm font-medium">{name}</span>
        <ChevronDown
          className="size-4 text-muted-foreground transition-transform duration-200
          group-data-[state=open]:rotate-180"
        />
        <Avatar className="size-9 border border-border">
          <AvatarImage src="" alt={name} />
          <AvatarFallback className="bg-primary/10 font-semibold text-primary">
            {user?.name?.charAt(0).toLocaleUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-52 rounded-xl border border-border p-1.5 shadow-lg"
      >
        <div className="mb-1 border-b px-1 py-2">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">+{user?.phone}</p>
        </div>

        <DropdownMenuItem className="h-9 p-0.5 cursor-pointer rounded-lg">
          <Link
            href="/profile"
            className="flex p-0 m-0 items-center justify-start"
          >
            <div className="icon w-7 h-7 flex items-center justify-center">
              <UserRound className="size-4" />
            </div>
            <span className="text-[13px] ml-1">Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="h-9 cursor-pointer p-0.5 rounded-lg"
          onClick={() => openModal("logout")}
        >
          <div className="flex items-center justify-start">
            <div className="w-7 h-7 flex items-center justify-center">
              <LogOut className="size-4" />
            </div>
            <span className="text-[13px] ml-1">Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
