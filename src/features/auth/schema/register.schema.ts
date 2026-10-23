import { z } from "zod";

const checkPhoneSchema = z.object({
  name: z.string().min(2, "Too short"),
  phone: z.string().regex(/^\+998\d{9}$/, "Invalid phone number"),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
});

export const registerSchema = z
  .object({
    ...checkPhoneSchema.shape,
    ...passwordSchema.shape,
    ...otpSchema.shape,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterFormValues = z.infer<typeof registerSchema>;

export { checkPhoneSchema, passwordSchema, otpSchema };
