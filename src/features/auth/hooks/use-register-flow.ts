"use client";
import { UseFormReturn } from "react-hook-form";
import { RegisterFormValues } from "../schema/register.schema";

import { useCallback, useRef, useState } from "react";
import { registerSteps } from "../constants/register-steps";
import { toast } from "sonner";
import { validateFormStep } from "@/lib/utils/validate-form-step";
import { api } from "@/lib/api/axios";
import { RegisterStore, useRegisterStore } from "../store/register.store";

interface ApiResponse<T> {
  data: T;
}

interface Options {
  onComplete?: () => void;
}

export function useRegisterFlow(
  form: UseFormReturn<RegisterFormValues>,
  { onComplete }: Options = {},
) {
  const currentStep = useRegisterStore(
    (state: RegisterStore) => state.currentStep,
  );
  const setStep = useRegisterStore((state: RegisterStore) => state.setStep);
  const [isLoading, setIsLoading] = useState(false);

  const inFlight = useRef(false);

  const handleNext = useCallback(async (): Promise<void> => {
    if (inFlight.current) return;
    inFlight.current = true;
    setIsLoading(true);

    try {
      const index = registerSteps.findIndex((s) => s.id === currentStep);
      const step = registerSteps[index];
      if (!step) {
        toast.error("Invalid registration step");
        return;
      }
      const isValid = await validateFormStep({
        form,
        steps: registerSteps,
        stepId: currentStep,
        setStep,
      });
      if (!isValid) return;

      if (step.endpoint) {
        const all = form.getValues();
        const payload = Object.fromEntries(
          (step.payloadFields ?? step.fields).map((f) => [f, all[f]]),
        );

        const res = await api.post<ApiResponse<{ message?: string }>>(
          step.endpoint,
          payload,
        );

        toast.success(res.data?.data?.message ?? "Successful");
      }

      const next = registerSteps[index + 1];
      if (next) setStep(next.id);
      else onComplete?.();
    } catch (error: unknown) {
      console.log(error);

      toast.error("error");
    } finally {
      inFlight.current = false;
      setIsLoading(false);
    }
  }, [currentStep, form, onComplete, setStep]);

  return { currentStep, isLoading, handleNext };
}
