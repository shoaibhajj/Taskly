import z from "zod";

export const logInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "length-failed" })
    .max(64, { message: "Password cannot exceed 64 characters" }),
});

export type LogInFormData = z.infer<typeof logInSchema>;
