import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface StepConfig<TStep extends string> {
  id: TStep;
  fields: readonly string[];
}

interface ValidateFormStepOptions<
  TValues extends FieldValues,
  TStep extends string,
> {
  form: UseFormReturn<TValues>;
  steps: any;
  stepId: TStep;
  setStep: (step: TStep) => void;
  onError?: (field: string) => void;
}

export async function validateFormStep<
  TValues extends FieldValues,
  TStep extends string,
>({
  form,
  steps,
  stepId,
  setStep,
  onError,
}: ValidateFormStepOptions<TValues, TStep>): Promise<boolean> {
  const currentStep = steps.find((step: any) => step.id === stepId);

  if (!currentStep) return false;
  if (currentStep.id === "images") {
    for (const field of currentStep.fields) {
      const isValid = await form.trigger(field as FieldPath<TValues>);
      if (!isValid) toast.error("Upload min 3 images");
    }
  }
  for (const field of currentStep.fields) {
    const isValid = await form.trigger(field as FieldPath<TValues>);

    if (!isValid) {
      setStep(stepId);

      if (onError) {
        onError(field);
      } else {
        setTimeout(() => {
          const element = document.getElementById(field);

          element?.focus({ preventScroll: true });
          element?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 200);
      }

      return false;
    }
  }

  return true;
}
