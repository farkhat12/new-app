import { FieldPath } from "react-hook-form";
import { ApartmentFormValues } from "../schema/apartment.schema";
import { UploadStepId } from "../types/upload.types";

export type ApartmentStepType = {
  id: UploadStepId;
  title: string;
  fields: FieldPath<ApartmentFormValues>[];
};

export const apartmentSteps: ApartmentStepType[] = [
  {
    id: "info",
    title: "Info",
    fields: [
      "address",
      "orienteer",
      "price",
      "phone",
      "rentType",
      "forWhom",
      "amenities",
    ],
  },
  {
    id: "images",
    title: "Images",
    fields: ["images"],
  },
  {
    id: "map",
    title: "Map",
    fields: [],
  },
  {
    id: "overview",
    title: "Overview",
    fields: [],
  },
];
