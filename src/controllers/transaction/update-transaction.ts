import type { UpdateTransactionUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  defaultErrorResponse,
  invalidParamsResponse,
  okResponse,
} from "../helpers";

import { updateTransactionSchema } from "@/schema";

export class UpdateTransactionController {
  private updateTransactionUseCase: UpdateTransactionUseCase;

  constructor(updateTransactionUseCase: UpdateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const data = httpRequest.body;
      const id = httpRequest.params.id;

      if (!data) {
        return invalidParamsResponse();
      }

      const transaction = updateTransactionSchema.parse({
        ...data,
        id,
        type: data.type ? String(data.type).toUpperCase() : undefined,
      });

      const updatedTransaction = await this.updateTransactionUseCase.execute({
        ...transaction,
        amount: String(transaction.amount),
        id,
      });
      return okResponse(updatedTransaction);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
