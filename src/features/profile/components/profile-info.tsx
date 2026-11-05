"use client";
import { User } from "@/features/auth/types/register.types";
import { EditProfileDialog } from "@/shared/dialog/edit-profile-dialog";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Phone } from "lucide-react";

const ProfileInfo = ({ user }: { user: User }) => {
  const formattedName =
    user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase();
  return (
    <section className="flex flex-col justify-start gap-2 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <Avatar className="size-16 shrink-0 sm:size-20">
          <AvatarFallback className="bg-[#dfe7f5] text-lg font-medium text-slate-600 sm:text-2xl">
            {formattedName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <h1 className="truncate text-2xl font-semibold tracking-tight">
            {formattedName}
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm">
            <Phone className="size-3.5" />
            <span dir="ltr">+{user.phone}</span>
          </p>
        </div>
      </div>

      <EditProfileDialog user={user} />
    </section>
  );
};

export default ProfileInfo;
