import { ElementType } from "react";

export type ApartmentStatus = "active" | "archived" | "unpaid";

export const RENT_TYPE_VALUES = ["long", "short"] as const;
export type RentType = (typeof RENT_TYPE_VALUES)[number];

export const FOR_WHOM_VALUES = ["boys", "girls", "family", "everyone"] as const;
export type ForWhom = (typeof FOR_WHOM_VALUES)[number];

export interface IAmenity {
  id: string;
  title: string;
  icon: ElementType;
}

export interface Apartment {
  _id: string;
  ownerId: string;
  ownerName: string;
  address: string;
  orienteer: string;
  price: number;
  phone: string;
  rooms: number;
  rentType: RentType;
  forWhom: ForWhom;
  status: ApartmentStatus;
  amenities: string[];
  images: {
    publicId: string;
    url: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
