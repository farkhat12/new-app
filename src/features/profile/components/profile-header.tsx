"use client";

import { CalendarDays, Pencil, Phone } from "lucide-react";

import type { User } from "@/features/auth/types/register.types";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

interface ProfileHeaderProps {
  user: User;
  onEdit?: () => void;
}

export function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  const fullName = user.name
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const initials = fullName
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <section className="relative overflow-hidden rounded-xl border bg-linear-to-r from-blue-50 via-indigo-50 to-blue-100 p-4 sm:rounded-2xl sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-16 -top-24 size-48 rounded-full bg-blue-200/30 sm:size-72" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 size-48 rounded-full bg-indigo-200/30 sm:size-72" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* User info */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
          <Avatar className="size-16 shrink-0 border-2 border-white shadow-sm sm:size-24 sm:border-4 lg:size-32">
            <AvatarImage src={user.avatar || undefined} alt={fullName} />
            <AvatarFallback className="bg-blue-600 text-xl font-semibold text-white sm:text-3xl">
              {initials || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-1.5 sm:space-y-3">
            <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
              {fullName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm">
                <Phone className="size-3.5 sm:size-4" />
                <span>+{user.phone}</span>
              </div>

              <Badge className="rounded-full bg-blue-100 px-2.5 text-xs text-blue-700 hover:bg-blue-100">
                {user.role}
              </Badge>
            </div>

            {user.createdAt && (
              <div className="flex items-center gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm">
                <CalendarDays className="size-3.5 sm:size-4" />
                <span>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Edit button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="w-full shrink-0 gap-2 border-white bg-white text-slate-900 shadow-sm hover:bg-slate-50 sm:w-auto sm:self-start lg:self-center"
        >
          <Pencil className="size-3.5 sm:size-4" />
          Edit Profile
        </Button>
      </div>
    </section>
  );
}
