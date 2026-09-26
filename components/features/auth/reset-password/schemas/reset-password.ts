import z from "zod";

export const passwordSchema = z
  .string({ message: "Password is required" })
  .min(8, { message: "length-failed" })
  .max(64, { message: "Password cannot exceed 64 characters" })
  .refine((val) => !/\s/.test(val), {
    message: "Password cannot contain spaces",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "uppercase-failed",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "lowercase-failed",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "digit-failed",
  })
  .refine((val) => /[^A-Za-z0-9\s]/.test(val), {
    message: "special-failed",
  });

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, {
      message: "confirm Password must be at least 1 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type resetPasswordFormData = z.infer<typeof resetPasswordSchema>;
