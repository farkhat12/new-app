import { Header } from "@/components/layout/header";
import { BottomNavigation, Sidebar } from "@/components/layout/navigation";
import UserProvider from "@/components/providers/user-provider";
import { getUser } from "@/features/auth/api/get-user.ts";

export default async function MainLayout({ children }: LayoutProps<"/">) {
  const user = await getUser();

  return (
    <UserProvider user={user ?? null}>
      <main className="flex h-dvh flex-col-reverse overflow-hidden bg-[#f4f6f9] md:flex-row">
        <Sidebar />
        <BottomNavigation />
        <section className="relative flex h-full flex-1 flex-col overflow-hidden">
          <Header />
          <div className="page flex-1 overflow-y-auto overflow-x-hidden p-1 py-2 md:p-2 md:py-3">
            {children}
          </div>
        </section>
      </main>
    </UserProvider>
  );
}
