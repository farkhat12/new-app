"use client";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { CirclePoundSterling } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";

interface PriceInputProps {
  name: string;
}

export function PriceInput({ name }: PriceInputProps) {
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: 0,
  });

  const displayValue = formatPrice(field.value);

  return (
    <div className="space-y-0.5 mb-0 flex-1">
      <Label
        htmlFor="price"
        className="inline-block cursor-pointer pr-4 mb-1 text-sm font-medium text-slate-900"
      >
        Price
      </Label>
      <div className="relative">
        <CirclePoundSterling
          className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          strokeWidth={1.8}
        />
        <Input
          id={name}
          placeholder="2 000 000 sum"
          inputMode="numeric"
          autoComplete="off"
          className="border-slate-200 pl-9 text-base placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 md:text-[16px]"
          value={displayValue || " "}
          onChange={(e) => {
            const numericValue = parsePrice(e.target.value);
            field.onChange(numericValue);
          }}
          onBlur={field.onBlur}
          ref={field.ref}
        />
      </div>

      {fieldState.error && (
        <p className="text-[13px] text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}

export function formatPrice(value: number | string) {
  const num = String(value).replace(/\D/g, "");

  if (!num) return "";

  return Number(num).toLocaleString("ru-RU");
}

export function parsePrice(value: string) {
  const numericValue = value.replace(/\D/g, "");

  return numericValue ? Number(numericValue) : 0;
}
