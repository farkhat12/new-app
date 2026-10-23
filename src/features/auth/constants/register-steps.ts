import { RegisterStepConfig } from "../types/register.types";

export const REGISTER_STEPS = ["info", "password", "otp"] as const;

export const registerSteps: RegisterStepConfig[] = [
  {
    id: "info",
    fields: ["name", "phone"],
    endpoint: "/auth/check-phone",
    payloadFields: ["phone"],
  },
  {
    id: "password",
    fields: ["password", "confirmPassword"],
    endpoint: "/auth/register",
    payloadFields: ["name", "phone", "password"],
  },
  {
    id: "otp",
    fields: ["otp"],
    endpoint: "/auth/verify-otp",
    payloadFields: ["phone", "otp"],
  },
] as const;
