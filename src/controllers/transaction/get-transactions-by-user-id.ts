import type { GetTransactionsByUserIdUseCase } from "@/use-cases";
import type { Request } from "express";

import { defaultErrorResponse, okResponse } from "../helpers";

import { getTransactionByUserSchema } from "@/schema";

export class GetTransactionsByUserIdController {
  private getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase;

  constructor(getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const userId = httpRequest.query.user_id as string;

      const transaction = getTransactionByUserSchema.parse({ user_id: userId });

      const transactions = await this.getTransactionsByUserIdUseCase.execute(
        transaction.user_id,
      );

      return okResponse(transactions);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
