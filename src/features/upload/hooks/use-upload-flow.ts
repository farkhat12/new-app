"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import type { FieldErrors, UseFormReturn } from "react-hook-form";
import type { ApartmentFormValues } from "@/features/upload/schema/apartment.schema";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useApartmentStore } from "../store/upload-apartment.store";
import { apartmentSteps } from "../constants/upload-apartment-steps";
import { buildApartmentFormData } from "@/lib/utils/build-form-data";
import { createApartment } from "../api/upload.api";
import { validateFormStep } from "@/lib/utils/validate-form-step";

interface Options {
  onSuccess?: () => void;
}

const FIRST_STEP = apartmentSteps[0];

export function useApartmentUploadFlow(
  form: UseFormReturn<ApartmentFormValues>,
  { onSuccess }: Options = {},
) {
  const currentStep = useApartmentStore((s) => s.currentStep);
  const setStep = useApartmentStore((s) => s.setStep);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const inFlight = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const index = apartmentSteps.findIndex((s) => s.id === currentStep);
  const isFirst = index <= 0;
  const isLast = index === apartmentSteps.length - 1;

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      setStep(FIRST_STEP.id);
    };
  }, [setStep]);

  useEffect(() => {
    if (!isUploading) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isUploading]);

  const upload = async (values: ApartmentFormValues): Promise<void> => {
    const controller = new AbortController();
    abortRef.current = controller;
    setUploadProgress(0);
    setIsUploading(true);

    try {
      const res = await createApartment(
        buildApartmentFormData(values),
        setUploadProgress,
        controller.signal,
      );
      toast.success(res.data.message);
      form.reset();
      setStep(FIRST_STEP.id);
      onSuccess?.();
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      toast.error(getErrorMessage(error, "Upload failed. Please try again."));
    } finally {
      abortRef.current = null;
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Соңғы step-те схеманың бәрі қайта тексеріледі; қате ертерек step-те болса, сонда қайтарамыз
  const onInvalid = (errors: FieldErrors<ApartmentFormValues>): void => {
    const failing = apartmentSteps.find((s) =>
      s.fields.some((f) => f in errors),
    );
    if (failing) setStep(failing.id);
    toast.error("Please fix the highlighted fields");
  };

  const handleNext = useCallback(async (): Promise<void> => {
    if (inFlight.current) return;
    inFlight.current = true;

    try {
      const step = apartmentSteps[index];
      if (!step) return;

      const isValid = await validateFormStep({
        form,
        steps: apartmentSteps,
        stepId: currentStep,
        setStep,
      });
      if (!isValid) return;
      if (!isLast) {
        setStep(apartmentSteps[index + 1].id);
        return;
      }

      await form.handleSubmit(upload, onInvalid)();
    } finally {
      inFlight.current = false;
    }
  }, [index, isLast, form, setStep]);

  const handlePrevious = useCallback((): void => {
    if (inFlight.current || isFirst) return;
    setStep(apartmentSteps[index - 1].id);
  }, [index, isFirst, setStep]);

  return {
    currentStep,
    isFirst,
    isLast,
    isUploading,
    uploadProgress,
    handleNext,
    handlePrevious,
  };
}
