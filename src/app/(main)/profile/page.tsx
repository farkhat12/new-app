"use server";
import { ApartmentTabs } from "@/features/profile/components/apartment-tabs";
import ProfileInfo from "@/features/profile/components/profile-info";
import { getMe } from "@/lib/api/server-api";

export default async function ProfilePage() {
  const data = await getMe();

  return (
    <div className="min-w-0 space-y-4 w-full">
      <h1>{data.name}</h1>
      {/* <ProfileInfo userInfo={data.data.data} /> */}
      <ApartmentTabs />
    </div>
  );
}
