"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkPhoneSchema,
  RegisterFormValues,
} from "../schema/register.schema";
import { Button } from "@/shared/ui/button";
import { PhoneInput, TextInput } from "@/shared";
import { useRegisterStore } from "../store/register.store";

type RegisterInfoValues = Pick<RegisterFormValues, "name" | "phone">;

interface RegisterInfoFormProps {
  onSubmit: (values: RegisterInfoValues) => Promise<boolean>;
  isPending: boolean;
}

export function RegisterInfoForm({
  onSubmit,
  isPending,
}: RegisterInfoFormProps) {
  const storedValues = useRegisterStore((s) => s.values);
  const form = useForm<Pick<RegisterFormValues, "name" | "phone">>({
    resolver: zodResolver(checkPhoneSchema),
    defaultValues: {
      name: storedValues.name ?? "",
      phone: storedValues.phone ?? "",
    },
  });

  const handleSubmit = async (
    values: Pick<RegisterFormValues, "name" | "phone">,
  ) => {
    await onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <TextInput name="name" label="Name" placeholder="Enter your name" />
        <PhoneInput />
        <div className="flex gap-3 mt-3">
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? "Please wait..." : "Continue"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
