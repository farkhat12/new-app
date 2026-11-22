import { clientApi } from "@/lib/api/client-axios";
import { RegisterFormValues } from "../schema/register.schema";

export const authApi = {
  checkPhone: (values: Partial<RegisterFormValues>) =>
    clientApi.post<void>("/auth/check-phone", { phone: values.phone }),

  register: (values: Partial<RegisterFormValues>) =>
    clientApi.post<{ data: any }>("/auth/register", {
      name: values.name,
      phone: values.phone,
      password: values.password,
    }),

  verifyOtp: (values: Partial<RegisterFormValues>) =>
    clientApi.post<void>("/auth/verify-otp", {
      phone: values.phone,
      otp: values.otp,
    }),
  resendOtp: (phone: string) =>
    clientApi.post<{ data: any }>("/auth/register/resend-otp", { phone }),

  forgotPassword: (phone: string) =>
    clientApi.post<{ data: any }>("/auth/forgot-password", { phone }),
};
