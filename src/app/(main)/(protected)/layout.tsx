"use server";
import { PageTransition } from "@/components/providers/PageTransition";
import { getUser } from "@/features/auth/api/get-user.ts";
import { UnauthorizedCard } from "@/features/auth/cards/unauthorized-card";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) return <UnauthorizedCard />;
  return <PageTransition>{children}</PageTransition>;
}
