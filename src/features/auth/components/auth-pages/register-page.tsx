"use client";
import { useRegisterFlow } from "../../hooks/use-register-flow";
import { RegisterInfoForm } from "../register-info-form";
import { RegisterPasswordForm } from "../register-password-form";
import OtpForm from "@/features/otp/otp-form";
import { useRouter } from "next/navigation";

export const RegisterPage = () => {
  const route = useRouter();
  const {
    currentStep,
    isPending,
    submitInfo,
    submitPassword,
    submitOtp,
    back,
    canResend,
    secondsLeft,
    isResending,
    resendOtp,
  } = useRegisterFlow({
    onSuccess: () => {
      route.replace("/profile");
    },
  });
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Join Ornalas and find your perfect place.
          </p>
        </div>

        {currentStep === "info" && (
          <RegisterInfoForm onSubmit={submitInfo} isPending={isPending} />
        )}
        {currentStep === "password" && (
          <RegisterPasswordForm
            onSubmit={submitPassword}
            isPending={isPending}
            onBack={back}
          />
        )}
        {currentStep === "otp" && (
          <OtpForm
            onSubmit={submitOtp}
            isPending={isPending}
            onBack={back}
            isResending={isResending}
            secondsLeft={secondsLeft}
            canResend={canResend}
            resendOtp={resendOtp}
          />
        )}
      </div>
    </div>
  );
};
