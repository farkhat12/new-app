"use client";
import { navigationItems } from "../navigation-config";
import NavigationItem from "../components/navigation-item";
import { Button } from "@/shared/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";
import LogoutDialog from "@/shared/dialog/logout-dialog";
import { cn } from "cn";

const Sidebar = () => {
  const sidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const openModal = useUIStore((store) => store.openModal);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  return (
    <div
      className={`hidden min-h-full md:flex border-r bg-white flex-col border-gray-200 transition-[width] duration-200 text-white ${sidebarOpen ? `w-60` : `w-14 justify-center`} ease-in-out`}
    >
      <div
        className={`flex items-center px-2 py-2 justify-between gap-2 w-full border-b h-13 border-gray-200`}
      >
        {sidebarOpen && (
          <span className="text-base font-semibold px-2 text-blue-500">
            Logo
          </span>
        )}
        <Button
          variant="secondary"
          size="lg"
          onClick={toggleSidebar}
          className="h-8 w-10 hover:bg-gray-200 bg-gray-100 text-black cursor-pointer rounded-md"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <nav className="flex flex-1 flex-col p-2 gap-1">
        {navigationItems.map((item) => (
          <NavigationItem key={item.id} {...item} isOpen={sidebarOpen} />
        ))}
      </nav>
      <div className="flex border-t border-gray-200 flex-col p-2 gap-1">
        <div
          onClick={() => openModal("logout")}
          className={cn(
            "flex   flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1",
            "md:h-9 md:w-auto w-16 max-w-18.5 cursor-pointer md:max-w-none md:flex-none md:flex-row md:justify-start md:gap-1 md:overflow-hidden md:rounded-md md:px-0",
            "text-red-400 bg-red-50 transition-colors hover:bg-red-100 hover:text-red-400",
          )}
        >
          <div className="flex items-center justify-center md:h-9 md:w-10 md:min-w-10 md:rounded-md">
            <LogOut
              className="h-5 w-5 shrink-0"
              strokeWidth={sidebarOpen ? 2.5 : 2}
            />
          </div>
          <span
            className={cn(
              "text-[11px] font-medium md:truncate md:text-[13px] md:font-normal",
              !sidebarOpen && "md:hidden",
            )}
          >
            Logout
          </span>
        </div>
      </div>
      <LogoutDialog />
    </div>
  );
};

export default Sidebar;
