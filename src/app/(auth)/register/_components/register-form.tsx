"use client";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { House } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/features/auth/schema/register.schema";
import { InfoStep, PasswordsStep, OtpStep } from "./index";
import { useRouter } from "next/navigation";
import { useRegisterFlow } from "@/features/auth/hooks/use-register-flow";
import { RegisterStepId } from "@/features/auth/types/register.types";

const defaultValues: RegisterFormValues = {
  name: "",
  phone: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const stepComponents: Record<RegisterStepId, typeof InfoStep> = {
  info: InfoStep,
  password: PasswordsStep,
  otp: OtpStep,
};

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues,
  });
  const { currentStep, isLoading, handleNext } = useRegisterFlow(form, {
    onComplete: () => router.push("/profile"),
  });
  const Step = stepComponents[currentStep];

  return (
    <Card className="w-full rounded-[18px] py-0 md:gap-2 gap-1 border-slate-200 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:translate-y-0 -translate-y-1/3 max-w-md border">
      <CardHeader className="text-center space-y-0 md:gap-1 gap-0 mt-2 py-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
          <House className="h-6 w-6 text-blue-600" strokeWidth={2} />
        </div>
        <CardTitle className="text-[16px] md:text-xl font-semibold mb-0">
          Create a new account
        </CardTitle>
      </CardHeader>
      <FormProvider {...form}>
        <Step handleNext={handleNext} isLoading={isLoading} />
      </FormProvider>
      <CardFooter className="justify-center text-sm py-5 text-muted-foreground">
        Already have an account?
        <Link
          href="/login"
          className="ml-2 font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
