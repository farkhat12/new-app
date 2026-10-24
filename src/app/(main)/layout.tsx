"use client";
import { Header } from "@/components/layout/header";
import { BottomNavigation, Sidebar } from "@/components/layout/navigation";
import { api } from "@/lib/api/axios";
import { serverApi } from "@/lib/api/server-api";
import { useEffect } from "react";

export default async function MainLayout({ children }: LayoutProps<"/">) {
  useEffect(() => {
    const get = async () => {
      const res = await serverApi("/api/users/me");
      console.log(res, "new fetch in layout");
    };
    get();
  }, []);
  return (
    <main className="h-full bg-[#f4f6f9] flex-col-reverse md:flex-row min-h-dvh max-h-dvh overflow-hidden flex">
      <Sidebar />
      <BottomNavigation />
      <section className="flex flex-col overflow-hidden h-100dvh max-h-dvh relative flex-1">
        <Header />
        <div className="page flex-1 overflow-y-scroll overflow-x-hidden md:p-2 p-1 py-2 md:py-3">
          {children}
        </div>
      </section>
    </main>
  );
}
