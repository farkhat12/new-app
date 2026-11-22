import type { Metadata } from "next";
import { LoginPage } from "@/features/auth/components/auth-pages";

export const metadata: Metadata = {
  title: "Login | Ornalas",
  description: "Ornalas аккаунтыңызға кіріңіз.",
};

export default function Page() {
  return (
    <div className="flex min-h-dvh items-center px-4 md:p-2 justify-center">
      <LoginPage />
    </div>
  );
}
