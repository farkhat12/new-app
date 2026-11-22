import { getUser } from "@/features/auth/api/get-user.ts";
import { UnauthorizedCard } from "@/features/auth/cards/unauthorized-card";
import { AccountSettings } from "@/features/profile/components/account-settings";
import { MyApartments } from "@/features/profile/components/my-apartments";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { serverApi } from "@/lib/api/server-api";
import { Apartment } from "@/types/apartment.types";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) return <UnauthorizedCard />;

  let apartments = [];

  try {
    const result = await serverApi.get("/apartments");
    apartments = result.data.data;
  } catch (error) {
    console.error("Failed to fetch apartments:", error);
  }

  return (
    <main className="mx-auto w-full space-y-5 p-3 sm:p-4 lg:p-2">
      <ProfileHeader user={user} />
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="space-y-5 lg:col-span-8">
          <MyApartments apartments={apartments} />
        </div>

        <aside className="space-y-5 lg:col-span-4">
          <AccountSettings />
        </aside>
      </div>
    </main>
  );
}
