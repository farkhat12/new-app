import z from "zod";

export const phoneSchema = z.object({
  phone: z.string().regex(/^\+998\d{9}$/, "Invalid phone number"),
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;
