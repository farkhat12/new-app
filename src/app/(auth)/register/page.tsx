import { RegisterPage } from "@/features/auth/components/auth-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Ornalas",
  description: "Ornalas аккаунтыңызға кіріңіз.",
};

export default function Page() {
  return (
    <div className="flex min-h-dvh items-center px-4 md:p-2 justify-center">
      <RegisterPage />
    </div>
  );
}
