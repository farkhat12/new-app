"use server";
import { User } from "@/features/auth/types/register.types";
import { ApartmentTabs } from "@/features/profile/components/apartment-tabs";
import ProfileInfo from "@/features/profile/components/profile-info";

export default async function ProfilePage() {
  const user: User = {
    id: "hd83by4bdy",
    name: "Farkhat",
    phone: "998936142724",
    role: "user",
    createdAt: "s",
  };
  return (
    <div className="min-w-0 space-y-4 w-full">
      <ProfileInfo userInfo={user} />
      <ApartmentTabs />
      {/* <ProfileTabs /> */}
    </div>
  );
}
