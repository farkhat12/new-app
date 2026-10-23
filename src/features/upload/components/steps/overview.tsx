"use client";
import { CalendarDays, UserRound } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/shared/ui/label";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/shared/ui/card";
import {
  Amenities,
  forWhomOptions,
  rentTypeOptions,
} from "@/features/apartments/constants/apartment-options";
import { ImageGallery } from "@/components/image-gallery/image-gallery";
import { Badge } from "@/shared/ui/badge";
import { ApartmentFormValues } from "../../schema/apartment.schema";

export default function PreviewStep() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { getValues } = useFormContext<ApartmentFormValues>();
  const {
    address,
    orienteer,
    price,
    images,
    rentType,
    forWhom,
    amenities,
    phone,
    rooms,
  } = getValues();

  const selectedForWhom = forWhomOptions.filter(
    (item) => item.id === forWhom,
  )[0];
  const selectedRentType = rentTypeOptions.filter(
    (item) => item.id === rentType,
  )[0];
  const selectedAmenities = Amenities.filter((amenity) =>
    amenities.includes(amenity.id),
  );
  console.log(selectedAmenities, "dd");

  const ForWhomIcon = selectedForWhom?.icon || UserRound;
  const RentTypeIcon = selectedRentType?.icon || CalendarDays;
  useEffect(() => {
    const urls = images.map((file: any) => URL.createObjectURL(file));
    setImageUrls(urls);
    return () => {
      urls.forEach((url: string) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [images]);
  return (
    <div className="flex flex-col gap-3">
      {/* lg-ге дейін тігінен, lg-тен бастап екі колонка (md-де sidebar бар, орын тар) */}
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
        {/* ------ image gallery ------ */}
        <div className="w-full min-w-0 lg:w-1/2">
          <ImageGallery images={imageUrls} showThumbnails showCounter />
        </div>

        {/* ------ Overview ------ */}
        <div className="flex w-full min-w-0 flex-col gap-3 lg:w-1/2">
          <Card className="gap-3 rounded-lg border-[#dfe4e0] p-3 shadow-none sm:p-4 lg:p-2">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-xs font-semibold text-[#0d1f55]">Address</p>
              <h2 className="wrap-break-word text-base font-bold leading-tight tracking-[-0.02em] text-[#29332f] sm:text-lg lg:text-[15px]">
                {address}
              </h2>
              <p className="wrap-break-word text-sm leading-tight text-[#7c8782]">
                {orienteer}
              </p>
            </div>

            {/* mobile: тігінен, sm+: 3 колонка */}
            <div className="grid grid-cols-1 divide-y divide-[#dfe4e0] border-t border-[#dfe4e0] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex min-w-0 flex-col gap-1 py-2 sm:py-2 sm:pr-2">
                <p className="text-[11px] font-semibold text-[#0d1f55]">
                  Price
                </p>
                <p className="text-[15px] font-bold leading-tight text-blue-500 lg:text-[12px]">
                  {price.toLocaleString("en-US")}
                  &nbsp;
                  <span className="font-medium text-[#7c8782]">
                    / {selectedRentType?.id === "long" ? "month" : "day"}
                  </span>
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-1 py-2 sm:p-2">
                <p className="text-[11px] font-semibold text-[#0d1f55]">
                  Rooms
                </p>
                <p className="text-sm font-bold leading-tight text-[#29332f] lg:text-[12px]">
                  {rooms} rooms
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-1 py-2 sm:p-2">
                <p className="text-[11px] font-semibold text-[#0d1f55]">
                  Phone
                </p>
                <p className="break-all text-sm font-bold leading-tight text-[#29332f] lg:text-[12px]">
                  {phone}
                </p>
              </div>
            </div>
          </Card>

          {/* For whom and Rent type */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-[#dfe4e0] p-2">
              <div className="flex aspect-square h-10 shrink-0 items-center justify-center rounded-lg bg-white/60">
                <ForWhomIcon className="size-6 text-blue-400" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs font-semibold leading-tight text-[#0d1f55]">
                  For whom
                </p>
                <h3 className="truncate text-[15px] font-bold leading-tight text-blue-400">
                  {selectedForWhom?.title}
                </h3>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 rounded-lg border border-[#dfe4e0] p-2">
              <div className="flex aspect-square h-10 shrink-0 items-center justify-center rounded-lg bg-white/60">
                <RentTypeIcon className="size-6 text-blue-400" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-xs font-semibold leading-tight text-[#0d1f55]">
                  Rent type
                </p>
                <h3 className="truncate text-[15px] font-bold leading-tight text-blue-400">
                  {selectedRentType?.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <Card className="rounded-lg border-[#dfe4e0] bg-white p-3 shadow-none sm:p-4 lg:p-2">
            <CardContent className="grid gap-y-2 p-0">
              <Label className="font-extrabold leading-tight text-[#0d1f55]">
                Amenities
              </Label>
              <div className="flex flex-wrap gap-2 p-0">
                {selectedAmenities.map((amenity: any) => {
                  const Icon = amenity.icon;
                  return (
                    <Badge
                      key={amenity.id}
                      variant="secondary"
                      className="h-auto select-none gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 font-semibold text-blue-500 transition-colors hover:bg-blue-100 lg:py-2"
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="text-xs">{amenity.title}</span>
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
