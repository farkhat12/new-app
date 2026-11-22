"use client";

import {
  CalendarDays,
  Camera,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type { User } from "@/features/auth/types/register.types";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface ProfileInfoProps {
  user: User;
  onEdit?: (field: "name" | "phone" | "avatar") => void;
}

export default function ProfileInfo({ user, onEdit }: ProfileInfoProps) {
  const fullName = user.name
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const initials = fullName
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Not available";

  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader className="px-4 pb-3 pt-4 sm:px-6 sm:pt-6">
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserRound className="size-5 text-muted-foreground" />
          Profile Information
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-center lg:grid-cols-[220px_1fr]">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="size-24 border-4 border-background shadow-sm sm:size-28">
                <AvatarImage src={user.avatar || undefined} alt={fullName} />

                <AvatarFallback className="bg-blue-600 text-3xl font-semibold text-white">
                  {initials || "U"}
                </AvatarFallback>
              </Avatar>

              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => onEdit?.("avatar")}
                className="absolute bottom-0 right-0 size-8 rounded-full border-2 border-background shadow-sm"
              >
                <Camera className="size-4" />
              </Button>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onEdit?.("avatar")}
            >
              Change Avatar
            </Button>
          </div>

          {/* User details */}
          <div className="space-y-4">
            {/* Full name */}
            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
              <span className="text-sm text-muted-foreground">Full Name</span>

              <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
                <span className="truncate text-sm font-medium">
                  {fullName || "Not provided"}
                </span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  onClick={() => onEdit?.("name")}
                >
                  <Pencil className="size-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Phone */}
            <div className="grid gap-2 sm:grid-cols-[110px_1fr] sm:items-center">
              <span className="text-sm text-muted-foreground">
                Phone Number
              </span>

              <div className="flex min-w-0 items-center justify-between gap-2 rounded-lg border px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-2">
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate text-sm font-medium">
                    {user.phone || "Not provided"}
                  </span>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 shrink-0"
                  onClick={() => onEdit?.("phone")}
                >
                  <Pencil className="size-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Role */}
            <div className="grid grid-cols-[110px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">Role</span>

              <div>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-50"
                >
                  <ShieldCheck className="mr-1 size-3" />
                  {user.role}
                </Badge>
              </div>
            </div>

            {/* Created date */}
            <div className="grid grid-cols-[110px_1fr] items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Account Created
              </span>

              <div className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="size-4 text-muted-foreground" />
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
