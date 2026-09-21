import z from "zod";

export const projectSchema = z.object({
  name: z
    .string({ message: "Project Title is Required" })
    .min(3, { message: "Project Title cannot be less than 3 characters" })
    .max(100, { message: "Project Title cannot exceed 100 characters" }),
  description: z
    .string()
    .max(500, { message: "Description  cannot exceed 500 characters" })
    .optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
