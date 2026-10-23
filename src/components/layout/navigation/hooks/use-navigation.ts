import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { navigationItems } from "../navigation-config";

export function useNavigation() {
  const pathname = usePathname();
  const isActive = useCallback(
    (to: string) =>
      to === "/"
        ? pathname === "/"
        : pathname === to || pathname.startsWith(`${to}/`),
    [pathname],
  );

  return {
    items: navigationItems,
    isActive,
  };
}
