import {
  Bookmark,
  CirclePlus,
  House,
  LucideIcon,
  MessageSquare,
  User,
} from "lucide-react";

export type NavigationItemConfig = {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
};

export const navigationItems: NavigationItemConfig[] = [
  {
    id: "apartments",
    label: "Apartments",
    to: "/apartments",
    icon: House,
  },
  {
    id: "messages",
    label: "Messages",
    to: "/messages",
    icon: MessageSquare,
  },
  {
    id: "upload",
    label: "Upload",
    to: "/upload",
    icon: CirclePlus,
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    to: "/bookmarks",
    icon: Bookmark,
  },
  {
    id: "profile",
    label: "Profil",
    to: "/profile",
    icon: User,
  },
];
