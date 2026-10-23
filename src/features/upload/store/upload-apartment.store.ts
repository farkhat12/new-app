import { create } from "zustand";
import { apartmentSteps } from "../constants/upload-apartment-steps";
import { UploadStepId } from "../types/upload.types";

export interface ApartmentStore {
  currentStep: UploadStepId;
  setStep: (step: UploadStepId) => void;
  prevStep: () => void;
}

export const useApartmentStore = create<ApartmentStore>((set, get) => ({
  currentStep: "info",
  setStep: (step: UploadStepId) =>
    set({
      currentStep: step,
    }),
  prevStep: () => {
    const currentStep = get().currentStep;
    const currentIndex = apartmentSteps.findIndex(
      (step) => step.id === currentStep,
    );
    if (currentIndex > 0) {
      set({ currentStep: apartmentSteps[currentIndex - 1].id });
    }
  },
}));
