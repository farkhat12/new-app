import { create } from "zustand";
import { RegisterStepId } from "../types/register.types";

export interface RegisterStore {
  currentStep: RegisterStepId;
  setStep: (step: RegisterStepId) => void;
  resetStep: () => void;
}

export const useRegisterStore = create<RegisterStore>((set) => ({
  currentStep: "info",
  setStep: (step) => set({ currentStep: step }),
  resetStep: () => set({ currentStep: "info" }),
}));
