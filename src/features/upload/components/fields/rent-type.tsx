"use client";
import { useController, useFormContext } from "react-hook-form";
import { OptionCard } from "../cards/option-card";
import { cn } from "cn";
import { Label } from "@/shared/ui/label";
import { TriangleAlert } from "lucide-react";
import { rentTypeOptions } from "@/features/apartments/constants/apartment-options";

export function RentType() {
  const name = "rentType";
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
      <Label className="cursor-pointer text-[#0d1f55] font-extrabold leading-tight">
        Rent type
      </Label>
      <div
        className={cn("grid grid-cols-1 cursor-pointer gap-2 sm:grid-cols-2")}
      >
        {rentTypeOptions.map((option) => {
          return <OptionCard name={name} key={option.id} option={option} />;
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
}
