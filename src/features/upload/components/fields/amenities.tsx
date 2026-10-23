import { useController, useFormContext } from "react-hook-form";
import { cn } from "cn";
import { Label } from "@/shared/ui/label";
import { TriangleAlert } from "lucide-react";
import { Amenities as amenities } from "@/features/apartments/constants/apartment-options";
import { IAmenity } from "@/types/apartment.types";
import AmenityCard from "../cards/amenity-card";

const Amenities = () => {
  const name = "amenities";
  const { control } = useFormContext();
  const { fieldState } = useController({ name, control });
  let hasError = fieldState.error;
  return (
    <section
      id={name}
      className={cn(
        "border border-transparent space-y-1 relative rounded-lg p-2 px-1 md:p-2",
        hasError && "bg-red-100 border-red-300",
      )} 
    >
      <Label className="cursor-pointer font-extrabold text-[#0d1f55] leading-tight">
        Amenities
      </Label>
      <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-2")}>
        {amenities.map((amenity: IAmenity) => {
          return <AmenityCard key={amenity.id} amenity={amenity} />;
        })}
      </div>
      {hasError && (
        <div className="flex ml-1 items-center gap-2">
          <TriangleAlert size={18} color="red" />
          <span className="text-[13px] leading-tight text-red-500">
            {hasError.message}
          </span>
        </div>
      )}
    </section>
  );
};

export default Amenities;
