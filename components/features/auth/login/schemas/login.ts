import z from "zod";

export const logInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string("Password is required"),
});

export type LogInFormData = z.infer<typeof logInSchema>;
