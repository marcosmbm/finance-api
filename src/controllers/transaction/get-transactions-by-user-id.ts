import type { GetTransactionsByUserIdUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  defaultErrorResponse,
  okResponse,
  checkIfUuidIsValid,
  invalidUuidResponse,
  invalidRequiredFieldsResponse,
} from "../helpers";

export class GetTransactionsByUserIdController {
  private getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase;

  constructor(getTransactionsByUserIdUseCase: GetTransactionsByUserIdUseCase) {
    this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const userId = httpRequest.query.user_id as string;

      if (!userId) {
        return invalidRequiredFieldsResponse("user_id");
      }

      const uuidIsValid = checkIfUuidIsValid(userId);
      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      const transactions =
        await this.getTransactionsByUserIdUseCase.execute(userId);

      return okResponse(transactions);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
