import { getUser } from "@/features/auth/api/get-user.ts";
import { UnauthorizedCard } from "@/features/auth/constants/cards/unauthorized-card";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) return <UnauthorizedCard />;
  return <>{children}</>;
}
