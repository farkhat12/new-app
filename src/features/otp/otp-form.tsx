import { OtpInput } from "@/shared";
import { FormProvider, useForm } from "react-hook-form";
import { otpSchema, RegisterFormValues } from "../auth/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";

interface RegisterPasswordFormProps {
  onSubmit: (values: { otp: string }) => Promise<boolean>;
  onBack: () => void;
  isPending: boolean;
  isResending: boolean;
  secondsLeft: number;
  canResend: boolean;
  resendOtp: () => void;
}

const OtpForm = ({
  onBack,
  isPending,
  onSubmit,
  isResending,
  secondsLeft,
  canResend,
  resendOtp,
}: RegisterPasswordFormProps) => {
  const form = useForm<Pick<RegisterFormValues, "otp">>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleSubmit = async (values: Pick<RegisterFormValues, "otp">) => {
    await onSubmit(values);
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <header className="form__head">
          <h2 className="form__title">Verify OTP code</h2>
        </header>
        <OtpInput name="otp" />
        <div className="flex gap-3">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onBack}
            >
              Артқа
            </Button>
          )}
          <Button type="submit" className="flex-1" disabled={isPending}>
            Verify
          </Button>
        </div>
        {canResend ? (
          <Button disabled={isResending} onClick={resendOtp}>
            {isResending ? "Sending..." : "Resend"}
          </Button>
        ) : (
          <span>{secondsLeft}</span>
        )}
      </form>
    </FormProvider>
  );
};

export default OtpForm;
