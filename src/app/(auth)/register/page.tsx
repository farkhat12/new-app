import type { Metadata } from "next";
import { RegisterForm } from "./_components";

export const metadata: Metadata = {
  title: "Register | Ornalas",
  description: "Ornalas аккаунтыңызға кіріңіз.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh items-center px-4 md:p-2 justify-center">
      <RegisterForm />
    </div>
  );
}
