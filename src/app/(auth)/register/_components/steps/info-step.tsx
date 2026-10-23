import { RegisterStepProps } from "@/features/auth/types/register.types";
import { PhoneInput, TextInput } from "@/shared";
import FormButton from "@/shared/buttons/form-button";
import { CardContent } from "@/shared/ui/card";
import { ArrowRight } from "lucide-react";

export const InfoStep = ({ handleNext, isLoading }: RegisterStepProps) => {
  return (
    <CardContent className="flex p-2 md:px-5 px-4 flex-col">
      <div className="input-fields flex flex-col gap-4">
        <TextInput label="Name" name="name" placeholder="John Doe" />
        <PhoneInput />
      </div>
      <FormButton
        onClick={handleNext}
        loadingText="Loading..."
        isLoading={isLoading}
        className="mt-3"
      >
        Next
        <ArrowRight className="ml-1 h-5 w-5" />
      </FormButton>
    </CardContent>
  );
};
