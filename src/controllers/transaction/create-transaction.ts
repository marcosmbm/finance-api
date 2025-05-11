import type { CreateTransactionUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  createdResponse,
  defaultErrorResponse,
  invalidParamsResponse,
} from "../helpers";

import { createTransactionSchema } from "@/schema";

export class CreateTransactionController {
  private createTransactionUseCase: CreateTransactionUseCase;

  constructor(createTransactionUseCase: CreateTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const data = httpRequest.body;

      if (!data) {
        return invalidParamsResponse();
      }

      const transaction = createTransactionSchema.parse({
        ...data,
        type: String(data.type).toUpperCase(),
      });

      const createdTransaction = await this.createTransactionUseCase.execute({
        ...transaction,
        amount: String(transaction.amount),
        date: new Date(transaction.date),
      });
      return createdResponse(createdTransaction);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
