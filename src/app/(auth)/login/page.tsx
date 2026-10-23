import type { Metadata } from "next";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login | Ornalas",
  description: "Ornalas аккаунтыңызға кіріңіз.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh items-center px-4 md:p-2 justify-center">
      <LoginForm />
    </div>
  );
}
