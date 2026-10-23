"use client";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { BedDouble } from "lucide-react";
import React from "react";
import { useController, useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
  placeholder: string;
}

export const NumberInput: React.FC<IProps> = ({ label, name, placeholder }) => {
  const { control, getValues } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: 0,
  });
  const value: number = getValues(name);

  return (
    <div className="space-y-1 flex-1">
      <Label
        htmlFor={name}
        className="cursor-pointer inline-block pr-4 text-sm font-medium text-slate-900"
      >
        {label}
      </Label>
      <div className="relative">
        <BedDouble
          className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          strokeWidth={1.8}
        />
        <Input
          placeholder={placeholder}
          value={value || ""}
          type="number"
          autoComplete="off"
          id={name}
          className="border-slate-200 pl-9 text-base placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 md:text-[16px]"
        />
      </div>
      {fieldState.error && (
        <p className="text-[13px] text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};
