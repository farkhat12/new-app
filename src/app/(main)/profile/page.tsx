"use server";
import { ApartmentTabs } from "@/features/profile/components/apartment-tabs";
import ProfileInfo from "@/features/profile/components/profile-info";
import { serverApi } from "@/lib/api/server-api";

export default async function ProfilePage() {
  const data = await serverApi("/users/me");

  return (
    <div className="min-w-0 space-y-4 w-full">
      <ProfileInfo userInfo={data.data} />
      <ApartmentTabs />
    </div>
  );
}
