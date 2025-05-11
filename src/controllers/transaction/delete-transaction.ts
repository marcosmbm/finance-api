import type { DeleteTransactionUseCase } from "@/use-cases";
import type { Request } from "express";

import { deleteTransactionSchema } from "@/schema";
import { defaultErrorResponse, okResponse } from "../helpers";

export class DeleteTransactionController {
  private deleteTransactionUseCase: DeleteTransactionUseCase;

  constructor(deleteTransactionUseCase: DeleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const transaction = deleteTransactionSchema.parse({ id });

      const deletedTransaction = await this.deleteTransactionUseCase.execute(
        transaction.id,
      );

      return okResponse(deletedTransaction);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
