"use client";
import { useFormContext, useWatch } from "react-hook-form";
import { IAmenity } from "@/types/apartment.types";

const AmenityCard = ({ amenity }: { amenity: IAmenity }) => {
  const name = "amenities";
  const { control, getValues, setValue } = useFormContext();
  const selectedValues = useWatch({
    name,
    control,
  });
  const { id, title, icon } = amenity;
  const isSelected = selectedValues.includes(id);
  const Icon = icon;
  const toggleAmenity = (id: string) => {
    const values = getValues(name);
    const newValues = values.includes(id)
      ? values.filter((v: string) => v !== id)
      : [...values, id];
    setValue(name, newValues, { shouldValidate: true });
  };

  return (
    <>
      <div
        className={`flex min-w-32 w-auto flex-1 items-center gap-2 md:p-1.5 p-1 rounded-xl border cursor-pointer select-none transition ${
          isSelected
            ? "border-[#5989f0] bg-white shadow-sm"
            : "border-[#e2e8f0] bg-white hover:border-slate-300"
        }`}
        onClick={() => toggleAmenity(id)}
      >
        <div
          className={`p-1 md:p-1.5 rounded-lg ${
            isSelected
              ? "bg-[#5989f0] text-white"
              : "bg-slate-200 text-slate-600"
          }`}
        >
          <Icon />
        </div>
        <span className="text-xs md:text-sm font-medium text-slate-800">
          {title}
        </span>
      </div>
    </>
  );
};

export default AmenityCard;
