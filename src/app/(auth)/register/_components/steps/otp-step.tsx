import { RegisterStepProps } from "@/features/auth/types/register.types";
import FormButton from "@/shared/buttons/form-button";
import { OtpInput } from "@/shared/inputs/otp-input";
import { CardContent } from "@/shared/ui/card";
import { ShieldCheck } from "lucide-react";

export const OtpStep = ({ handleNext, isLoading }: RegisterStepProps) => {
  return (
    <CardContent className="flex p-2 md:px-5 px-4 flex-col">
      <OtpInput name="otp" />
      <FormButton
        type="button"
        onClick={handleNext}
        className="mt-3"
        loadingText="Loading..."
        isLoading={isLoading}
      >
        <span className="text-[14px]">Verify</span>
        <ShieldCheck className="ml-1 h-5 w-5" />
      </FormButton>
    </CardContent>
  );
};
