"use client";

import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import {
  apartmentSchema,
  type ApartmentFormValues,
} from "@/features/upload/schema/apartment.schema";
import { UploadStepId } from "@/features/upload/types/upload.types";
import UploadCardHeader from "@/features/upload/components/upload-header";
import { UploadProgressOverlay } from "@/features/upload/components/upload-overlay";
// steps
import InfoStep from "@/features/upload/components/steps/info-step";
import ImageStep from "@/features/upload/components/steps/image-step";
import MapStep from "@/features/upload/components/steps/map-step";
import PreviewStep from "@/features/upload/components/steps/overview";
import { useApartmentUploadFlow } from "@/features/upload/hooks/use-upload-flow";

const defaultValues: DefaultValues<ApartmentFormValues> = {
  address: "",
  orienteer: "",
  price: undefined,
  phone: "",
  rooms: 2,
  rentType: undefined,
  forWhom: undefined,
  amenities: [],
  images: [],
};

const stepComponents: Record<UploadStepId, ComponentType> = {
  info: InfoStep,
  images: ImageStep,
  map: MapStep,
  overview: PreviewStep,
};

export default function UploadPage() {
  const router = useRouter();

  const form = useForm<ApartmentFormValues>({
    defaultValues,
    mode: "all",
    resolver: zodResolver(apartmentSchema),
  });

  const {
    currentStep,
    isFirst,
    isLast,
    isUploading,
    uploadProgress,
    handleNext,
    handlePrevious,
  } = useApartmentUploadFlow(form, {
    onSuccess: () => router.push("/profile"),
  });

  const Step = stepComponents[currentStep];

  return (
    <div className="upload-page md:p-1">
      <div className="relative mx-auto w-full max-w-4xl rounded-[18px] border border-slate-200 bg-white p-1.5 py-2 shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:gap-2 md:p-2">
        {isUploading && (
          <UploadProgressOverlay uploadProgress={uploadProgress} />
        )}

        <UploadCardHeader currentStep={currentStep} />

        <FormProvider {...form}>
          <div className="steps-content">
            <Step />
          </div>

          <div className="step-controller-buttons mt-1 flex items-center justify-between p-2 px-1 md:p-2">
            <Button
              type="button"
              variant="outline"
              className="min-w-22"
              disabled={isUploading || isFirst}
              onClick={handlePrevious}
            >
              Previous
            </Button>

            <Button
              type="button"
              variant="secondary"
              disabled={isUploading}
              className="min-w-22 bg-blue-500 text-white hover:bg-blue-600"
              onClick={handleNext}
            >
              {!isLast ? "Next" : isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
