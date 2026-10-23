import { FOR_WHOM_VALUES, RENT_TYPE_VALUES } from "@/types/apartment.types";
import { z } from "zod";
import { Amenities } from "../../apartments/constants/apartment-options";

const amenityIDs = Amenities.map((amenity) => amenity.id);

export const apartmentSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Enter the full address")
    .max(200, "Address is too long"),

  orienteer: z.string().trim().max(200, "Too long"),

  price: z
    .number({ message: "Enter a price" })
    .int("Price must be a whole number")
    .positive("Price must be greater than 0")
    .max(100_000_000, "Price is too high"),

  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{7,14}$/, "Enter a valid phone number"),

  rooms: z
    .number({ message: "Select number of rooms" })
    .int()
    .min(1, "At least 1 room")
    .max(10, "Maximum 10 rooms"),

  rentType: z.enum(RENT_TYPE_VALUES, { message: "Select rent type" }),

  forWhom: z.enum(FOR_WHOM_VALUES, { message: "Select who it's for" }),

  amenities: z
    .array(z.enum(amenityIDs))
    .max(Amenities.length)
    .min(1, "Minimum one amenity"),

  images: z
    .array(z.object())
    .min(3, "Upload at least 1 image")
    .max(6, `Maximum 6 images`),

  location: z.object(
    {
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    },
    { message: "Pick a location on the map" },
  ),
});

export type ApartmentFormValues = z.infer<typeof apartmentSchema>;
