"use server";
import { ApartmentTabs } from "@/features/profile/components/apartment-tabs";
import ProfileInfo from "@/features/profile/components/profile-info";
import { getMe } from "@/lib/api/server-api";

export default async function ProfilePage() {
  const data: any = await getMe();

  return (
    <div className="min-w-0 space-y-4 w-full">
      <h1>{data?.data?.name}</h1>
      <h2>{data?.name}</h2>
      {/* <ProfileInfo userInfo={data.data.data} /> */}
      <ApartmentTabs />
    </div>
  );
}
