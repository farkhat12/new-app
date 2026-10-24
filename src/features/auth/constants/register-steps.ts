import { RegisterStepConfig } from "../types/register.types";

export const REGISTER_STEPS = ["info", "password", "otp"] as const;

export const registerSteps: RegisterStepConfig[] = [
  {
    id: "info",
    fields: ["name", "phone"],
    endpoint: "/api/auth/check-phone",
    payloadFields: ["phone"],
  },
  {
    id: "password",
    fields: ["password", "confirmPassword"],
    endpoint: "/api/auth/register",
    payloadFields: ["name", "phone", "password"],
  },
  {
    id: "otp",
    fields: ["otp"],
    endpoint: "/api/auth/verify-otp",
    payloadFields: ["phone", "otp"],
  },
] as const;
