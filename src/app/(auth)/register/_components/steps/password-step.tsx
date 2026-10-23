import { PasswordInput } from "@/shared";
import { CardContent } from "@/shared/ui/card";
import FormButton from "@/shared/buttons/form-button";
import { RegisterStepProps } from "@/features/auth/types/register.types";

export const PasswordsStep = ({ handleNext, isLoading }: RegisterStepProps) => {
  return (
    <CardContent className="flex p-2 md:px-5 px-4 flex-col">
      <div className="input-fields flex flex-col gap-4">
        <PasswordInput label="Password" name="password" />
        <PasswordInput label="Confirm password" name="confirmPassword" />
      </div>
      <FormButton
        type="button"
        onClick={handleNext}
        className="mt-3"
        loadingText="Loading..."
        isLoading={isLoading}
      >
        <span className="text-[14px]">Register</span>
      </FormButton>
    </CardContent>
  );
};
