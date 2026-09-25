import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email Required" })
    .email("Please enter a valid email address"),
});

export type forgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
