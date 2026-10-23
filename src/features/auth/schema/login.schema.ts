import z from "zod";

export const loginSchema = z.object({
  phone: z.string().regex(/^\+998\d{9}$/, "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
