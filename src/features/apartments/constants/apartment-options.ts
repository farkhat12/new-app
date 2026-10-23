import {
  Wifi,
  Tv,
  WashingMachine,
  UtensilsCrossed,
  ShowerHead,
  Flame,
  Microwave,
  Maximize2,
  Snowflake,
  CalendarDays,
  Clock,
  User,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ForWhom, IAmenity, RentType } from "@/types/apartment.types";

export const rentTypeOptions: {
  id: RentType;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "long",
    title: "Long term",
    icon: CalendarDays,
    description: "Oylik yoki yillik ijara",
  },
  {
    id: "short",
    title: "Short term",
    icon: Clock,
    description: "Kundalik yoki haftalik ijara",
  },
];

export const forWhomOptions: {
  id: ForWhom;
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}[] = [
  {
    id: "boys",
    title: "Boys",
    icon: User,
    description: "Talaba / Erkaklar",
    color: "blue",
  },
  {
    id: "girls",
    title: "Girls",
    icon: User,
    description: "Talaba / Ayollar",
    color: "red",
  },
  {
    id: "family",
    title: "Family",
    icon: User,
    description: "Er-xotin / Bolali",
    color: "green",
  },
  {
    id: "everyone",
    title: "Everyone",
    icon: User,
    description: "Farqi yo'q",
    color: "yellow",
  },
];

export const Amenities: IAmenity[] = [
  { id: "wifi", title: "Wi-Fi", icon: Wifi },
  { id: "tv", title: "TV", icon: Tv },
  { id: "ac", title: "Air conditioning", icon: Snowflake },
  { id: "washer", title: "Washing machine", icon: WashingMachine },
  { id: "water_heater", title: "Ariston (Issiq suv)", icon: Flame },
  { id: "microwave", title: "Mikroto'lqinli", icon: Microwave },
  { id: "kitchen", title: "Oshxona", icon: UtensilsCrossed },
  { id: "balcony", title: "Balkon", icon: Maximize2 },
  { id: "shower", title: "Dush / Vanna", icon: ShowerHead },
];
