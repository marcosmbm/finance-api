import type { DeleteTransactionUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  checkIfUuidIsValid,
  defaultErrorResponse,
  invalidUuidResponse,
  okResponse,
} from "../helpers";

export class DeleteTransactionController {
  private deleteTransactionUseCase: DeleteTransactionUseCase;

  constructor(deleteTransactionUseCase: DeleteTransactionUseCase) {
    this.deleteTransactionUseCase = deleteTransactionUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const uuidIsValid = checkIfUuidIsValid(id);

      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      const transaction = await this.deleteTransactionUseCase.execute(id);
      return okResponse(transaction);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
