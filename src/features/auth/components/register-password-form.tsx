"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, RegisterFormValues } from "../schema/register.schema";
import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared";
import { useRegisterStore } from "../store/register.store";

type RegisterPasswordValues = Pick<
  RegisterFormValues,
  "password" | "confirmPassword"
>;

interface RegisterPasswordFormProps {
  onSubmit: (values: RegisterPasswordValues) => Promise<boolean>;
  onBack: () => void;
  isPending: boolean;
}

export function RegisterPasswordForm({
  onSubmit,
  onBack,
  isPending,
}: RegisterPasswordFormProps) {
  const storedValues = useRegisterStore((s) => s.values);
  const form = useForm<RegisterPasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: storedValues.password ?? "",
      confirmPassword: storedValues.confirmPassword ?? "",
    },
  });

  const handleSubmit = async (values: RegisterPasswordValues) => {
    await onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <PasswordInput name="password" label="Password" />

        <PasswordInput name="confirmPassword" label="Confirm password" />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onBack}
            disabled={isPending}
          >
            Back
          </Button>

          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? "Please wait..." : "Continue"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
