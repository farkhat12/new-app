"use client";
import React from "react";
import { useNavigation } from "../hooks/use-navigation";
import Link from "next/link";
import { NavigationItemConfig } from "../navigation-config";
import { cn } from "cn";

interface NavigationItemProps extends NavigationItemConfig {
  isOpen?: boolean;
}

const NavigationItem = ({
  to,
  label,
  icon: Icon,
  isOpen,
}: NavigationItemProps) => {
  const { isActive } = useNavigation();
  const active = isActive(to);
  return (
    <Link
      href={to}
      replace
      aria-current={active ? "page" : undefined}
      className={cn(
        // mobil: tömengi menyu
        "flex h-13 w-16 max-w-18.5 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1",
        // md+: sidebar
        "md:h-9 md:w-auto md:max-w-none md:flex-none md:flex-row md:justify-start md:gap-1 md:overflow-hidden md:rounded-md md:px-0",
        active
          ? "bg-blue-50 text-blue-500 md:shadow-sm md:hover:bg-blue-100"
          : "text-gray-500 md:text-gray-600 md:hover:bg-gray-100 md:hover:text-gray-900",
      )}
    >
      <div className="flex items-center justify-center md:h-9 md:w-10 md:min-w-10 md:rounded-md">
        <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.5 : 2} />
      </div>
      <span
        className={cn(
          "text-[11px] font-medium md:truncate md:text-[13px] md:font-normal",
          !isOpen && "md:hidden",
        )}
      >
        {label}
      </span>
    </Link>
  );
};

export default NavigationItem;
