"use client";

import { BedDouble, MapPin, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Apartment } from "@/types/apartment.types";

interface MyApartmentCardProps {
  apartment: Apartment;
  onEdit?: (apartment: Apartment) => void;
  onDelete?: (apartment: Apartment) => void;
}

export function MyApartmentCard({
  apartment,
  onEdit,
  onDelete,
}: MyApartmentCardProps) {
  const image = apartment.images?.[0]?.url;

  return (
    <article className="group overflow-hidden rounded-xl border bg-card transition-shadow duration-200 hover:shadow-md">
      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
        {/* Image */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-36">
          {image ? (
            <img
              src={image}
              alt={apartment.address}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}

          <Badge
            className={`absolute left-2 top-2 capitalize ${
              apartment.status === "active"
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {apartment.status}
          </Badge>
        </div>

        {/* Information */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="space-y-2">
            <p className="line-clamp-2 text-sm font-semibold leading-snug">
              {apartment.address}
            </p>

            {apartment.orienteer && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3.5 shrink-0" />
                <span className="truncate">{apartment.orienteer}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <BedDouble className="size-3.5" />
                {apartment.rooms} rooms
              </span>

              <span className="capitalize">{apartment.rentType} rent</span>
            </div>
          </div>

          <p className="mt-2 text-sm font-bold text-blue-600">
            {new Intl.NumberFormat("en-US").format(apartment.price)} UZS
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 border-t px-3 py-2.5 sm:px-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onEdit?.(apartment)}
          className="h-8 gap-1.5 text-xs"
        >
          <Pencil className="size-3.5" />
          Edit
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onDelete?.(apartment)}
          className="h-8 gap-1.5 text-xs text-destructive hover:text-destructive"
        >
          <Trash2 className="size-3.5" />
          Delete
        </Button>
      </div>
    </article>
  );
}
