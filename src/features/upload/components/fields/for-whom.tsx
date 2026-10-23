"use client";
import { useController, useFormContext } from "react-hook-form";
import { OptionCard } from "../cards/option-card";
import { cn } from "cn";
import { Label } from "@/shared/ui/label";
import { TriangleAlert } from "lucide-react";
import { forWhomOptions } from "@/features/apartments/constants/apartment-options";

export function ForWhom() {
  const name = "forWhom";
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
        For whom
      </Label>
      <div
        className={
          "grid grid-cols-1 cursor-pointer gap-3 sm:grid-cols-2 lg:grid-cols-4"
        }
      >
        {forWhomOptions.map((option) => {
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
