import { create } from "zustand";
import { RegisterStepId } from "../types/register.types";
import { RegisterFormValues } from "@/features/auth/schema/register.schema";

const REGISTER_STEPS: RegisterStepId[] = ["info", "password", "otp"];

export interface RegisterStore {
  values: RegisterFormValues;
  currentStep: RegisterStepId;
  setValues: (value: Partial<RegisterFormValues>) => void;
  setStep: (step: RegisterStepId) => void;
  next: () => void;
  back: () => void;
  resetStep: () => void;
}

const initialValues: RegisterFormValues = {
  phone: "",
  name: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  currentStep: "info",
  values: initialValues,
  setValues: (values) => {
    set((state) => ({
      values: {
        ...state.values,
        ...values,
      },
    }));
  },
  setStep: (step) => set({ currentStep: step }),
  next: () =>
    set((state) => {
      const currentIndex = REGISTER_STEPS.indexOf(state.currentStep);
      if (currentIndex === -1 || currentIndex >= REGISTER_STEPS.length - 1) {
        return state;
      }
      return { currentStep: REGISTER_STEPS[currentIndex + 1] };
    }),
  back: () =>
    set((state) => {
      const currentIndex = REGISTER_STEPS.indexOf(state.currentStep);
      const prevIndex = Math.max(0, currentIndex - 1);
      return { currentStep: REGISTER_STEPS[prevIndex] };
    }),
  resetStep: () => set({ currentStep: "info", values: initialValues }),
}));
