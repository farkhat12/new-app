"use server";
import { getUser } from "@/features/auth/api/get-user.ts";
import { ApartmentTabs } from "@/features/profile/components/apartment-tabs";
import ProfileInfo from "@/features/profile/components/profile-info";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="min-w-0 space-y-4 w-full">
      <p>profile page</p>
      <ProfileInfo userInfo={user} />
      <ApartmentTabs />
    </div>
  );
}
