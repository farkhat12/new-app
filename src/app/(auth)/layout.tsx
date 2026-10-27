import { getUser } from "@/features/auth/api/get-user.ts";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (user) redirect("/profile");

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full">{children}</div>
    </main>
  );
}
