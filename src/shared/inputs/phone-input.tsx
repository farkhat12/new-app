"use client";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useController, useFormContext } from "react-hook-form";
import { Phone } from "lucide-react";

const PREFIX = "+998";

export const PhoneInput = () => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name: "phone",
    control,
  });

  const value = field.value || "";

  const handleFocus = () => {
    if (!value) {
      field.onChange(PREFIX);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Тек + және цифрлар
    value = value.replace(/[^\d+]/g, "");

    // +998 міндетті
    if (!value.startsWith(PREFIX)) {
      value = PREFIX;
    }

    field.onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      value.length <= PREFIX.length
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-0.5 mb-0 flex-1">
      <Label
        htmlFor="phone"
        className="inline-block cursor-pointer pr-4 mb-1 text-sm font-medium text-slate-900"
      >
        Phone
      </Label>

      <div className="relative">
        <Phone
          className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          strokeWidth={1.8}
        />
        <Input
          {...field}
          id="phone"
          autoComplete="off"
          type="tel"
          value={value}
          onFocus={handleFocus}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={13}
          placeholder="+998 93 123 45 67"
          className="border-slate-200 pl-9 text-base placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 md:text-[16px]"
        />
      </div>

      {fieldState.error && (
        <p className="text-[13px] text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};
