import { REGISTER_STEPS } from "../constants/register-steps";
import { RegisterFormValues } from "../schema/register.schema";
export type RegisterStepId = (typeof REGISTER_STEPS)[number];

export interface RegisterStepConfig {
  id: RegisterStepId;
  fields: (keyof RegisterFormValues)[];
  payloadFields?: (keyof RegisterFormValues)[];
  endpoint?: string;
}

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  role: UserRole;
}

export interface RegisterStepProps {
  handleNext: () => void;
  isLoading: boolean;
}
