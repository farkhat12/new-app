"use client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
}

export const PasswordInput: React.FC<IProps> = ({ label, name }) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
  });
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-0.5 max-md:mb-1">
      <Label
        htmlFor={name}
        className="cursor-pointer inline-block pr-4 mb-1 text-sm font-medium text-slate-900"
      >
        {label}
      </Label>
      <div className="relative">
        <LockKeyhole
          className="absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          strokeWidth={1.8}
        />
        <Input
          type={show ? "text" : "password"}
          {...field}
          id={name}
          autoComplete="off"
          value={field.value}
          className="text-[14px] border-slate-200 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 text-base pl-9 md:text-[16px]"
          placeholder="••••••••"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShow((prev) => !prev)}
          className="
          absolute
          right-1
          top-1/2
          h-9
          w-9
          -translate-y-1/2
          text-slate-400
          hover:bg-transparent
          hover:text-slate-600
        "
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <EyeOff className="h-5 w-5" strokeWidth={1.8} />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={1.8} />
          )}
        </Button>
      </div>
      {fieldState.error && (
        <p className="text-[13px] text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
};
