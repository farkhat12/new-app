"use server";
import { getUser } from "@/features/auth/api/get-user.ts";
import { UnauthorizedCard } from "@/features/auth/constants/cards/unauthorized-card";
import { ApartmentTabs } from "@/features/profile/components/apartment-tabs";
import ProfileInfo from "@/features/profile/components/profile-info";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) return <UnauthorizedCard />;
  return (
    <div className="min-w-0 space-y-4 w-full">
      <p>profile page</p>
      <ProfileInfo userInfo={user} />
      <ApartmentTabs />
    </div>
  );
}
