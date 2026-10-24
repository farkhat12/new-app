"use server";
import { ApartmentTabs } from "@/features/profile/components/apartment-tabs";
import ProfileInfo from "@/features/profile/components/profile-info";
import { getMe } from "@/lib/api/server-api";
import { getUser } from "@/lib/api/session";

export default async function ProfilePage() {
  const data = await getMe();
  console.log(data, "jj");

  return (
    <div className="min-w-0 space-y-4 w-full">
      {/* <ProfileInfo userInfo={data.data} /> */}
      <ApartmentTabs />
    </div>
  );
}
