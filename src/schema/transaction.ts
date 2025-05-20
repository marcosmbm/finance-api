import { z } from "zod";

import {
  checkIfAmountIsCurrency,
  checkIfDateIsValid,
} from "@/controllers/helpers";

export const createTransactionSchema = z
  .object({
    user_id: z
      .string()
      .trim()
      .min(1, { message: "User id is required." })
      .uuid({ message: "Uuid invalid. Please, provider a valid one." }),
    name: z.string().min(1, { message: "Name is required." }),
    type: z.enum(["EARNING", "EXPENSE"], {
      message: "Transaction type must be 'EARNING' or 'EXPENSE'",
    }),
    date: z.coerce.string().refine(
      (date) => {
        return checkIfDateIsValid(date.toString());
      },
      {
        message:
          "Date invalid. Please, provider a valid date with the format (YYY-MM-DD).",
      },
    ),
    amount: z.coerce
      .number({ message: "Amount invalid." })
      .min(1, { message: "Amount is required" })
      .refine(
        (value) => {
          return checkIfAmountIsCurrency(String(value));
        },
        { message: "The amount must be a valid currency" },
      ),
  })
  .strict();

export const updateTransactionSchema = z
  .object({
    id: z
      .string()
      .uuid({ message: "Uuid invalid. Please, provider a valid one" }),
    name: z.string().min(1, { message: "Name is required." }).optional(),
    type: z
      .enum(["EARNING", "EXPENSE"], {
        message: "Transaction type must be 'EARNING' or 'EXPENSE'",
      })
      .optional(),
    date: z.coerce
      .string()
      .refine(
        (date) => {
          return checkIfDateIsValid(date.toString());
        },
        {
          message:
            "Date invalid. Please, provider a valid date with the format (YYY-MM-DD).",
        },
      )
      .optional(),
    amount: z.coerce
      .number({ message: "Amount invalid." })
      .min(1, { message: "Amount is required" })
      .refine(
        (value) => {
          return checkIfAmountIsCurrency(String(value));
        },
        { message: "The amount must be a valid currency" },
      )
      .optional(),
  })
  .strict();

export const getTransactionByUserSchema = z.object({
  user_id: z
    .string()
    .uuid({ message: "User Uuid invalid. Please, provider a valid one" }),
});

export const deleteTransactionSchema = z.object({
  id: z
    .string()
    .uuid({ message: "Uuid invalid. Please, provider a valid one" }),
});
