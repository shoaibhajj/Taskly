import z from "zod";

export const passwordSchema = z
  .string({message : "Password is required"})
  .min(8, { message: "length-failed" })
  .max(64, { message: "Password cannot exceed 64 characters" })
  .refine((val) => !/\s/.test(val), {
    message: "Password cannot contain spaces",
  })
  .refine(
    (val) => /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val),
    {
      message: "mixed-failed",
    },
  )
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "special-failed",
  });

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(50, { message: "name cannot exceed 50 characters" })
      .regex(/^[A-Za-z\u0600-\u06FF\s]+$/, {
        message: "Username must contain only letters and spaces",
      }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: passwordSchema,
    job_title: z.string().optional(),
    confirmPassword: z
      .string()
      .min(1, {
        message: "confirm Password must be at least 1 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
