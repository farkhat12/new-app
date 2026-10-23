"use client";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useController, useFormContext } from "react-hook-form";
import { User } from "lucide-react";
import React from "react";

interface IProps {
  label: string;
  name: string;
  placeholder: string;
}

export const TextInput: React.FC<IProps> = ({ label, name, placeholder }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });

  return (
    <div className="border border-transparent space-y-1 relative rounded-lg">
      <Label
        htmlFor={name}
        className="cursor-pointer mb-1 pr-4 text-sm font-medium text-slate-900"
      >
        {label}
      </Label>

      <div className="relative">
        <User
          className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-700"
          strokeWidth={1.8}
        />
        <Input
          {...field}
          id={name}
          autoComplete="off"
          placeholder={placeholder}
          inputMode="text"
          className="border-slate-200 pl-9 text-base placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 md:text-[16px]"
        />
      </div>

      {fieldState.error && (
        <p className="text-[13px] text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};
