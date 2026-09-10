import z from "zod";

export const logInSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string(),
  })


export type LogInFormData = z.infer<typeof logInSchema>;
