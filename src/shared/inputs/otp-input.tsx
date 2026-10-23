"use client";
import { useController, useFormContext } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

interface OtpFieldProps {
  name: string;
  length?: number;
}

export function OtpInput({ name, length = 6 }: OtpFieldProps) {
  const { control } = useFormContext();

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={length}
        value={field.value}
        onChange={field.onChange}
        className="justify-baseline"
      >
        <InputOTPGroup className="w-full justify-center gap-2 sm:gap-3">
          {Array.from({ length }).map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="h-10 w-12 border-2 border-l border-[#d0d1da] text-xl max-md:w-10.5"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {fieldState.error && (
        <p className="text-sm text-red-500">{fieldState.error.message}</p>
      )}
    </div>
  );
}
