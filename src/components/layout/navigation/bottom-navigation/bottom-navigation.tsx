"use client";
import NavigationItem from "../components/navigation-item";
import { navigationItems } from "../navigation-config";

const BottomNavigation = () => {
  return (
    <div className="md:hidden bg-white h-auto shadow-[0_-8px_24px_rgba(0,0,0,0.1)] flex items-center px-1 z-50 border-t border-gray-200">
      <div className="flex w-full justify-around py-1 items-center max-h-15 max-w-125 mx-auto">
        {navigationItems.map((item) => (
          <NavigationItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
