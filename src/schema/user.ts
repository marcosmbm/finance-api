import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z.string().trim().min(1, { message: "First name is required" }),
  last_name: z.string().trim().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email name is required" })
    .email({ message: "Please provide a valid e-mail." }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must have at least 6 characters." }),
});

export const updateUserSchema = z
  .object({
    id: z
      .string()
      .uuid({ message: "Uuid invalid. Please, provider a valid one" }),
    first_name: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .optional(),
    last_name: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .optional(),
    email: z
      .string()
      .trim()
      .min(1, { message: "Email name is required" })
      .email({ message: "Please provide a valid e-mail." })
      .optional(),
  })
  .strict({ message: "Some provided field not allowed" });

export const userIdSchema = z.object({
  id: z
    .string()
    .uuid({ message: "Uuid invalid. Please, provider a valid one" }),
});
