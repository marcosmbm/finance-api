import type { GetUserBalanceUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  checkIfUuidIsValid,
  defaultErrorResponse,
  invalidUuidResponse,
  okResponse,
} from "../helpers";

export class GetUserBalanceController {
  private getUserBalanceUseCase: GetUserBalanceUseCase;

  constructor(getUserBalanceUseCase: GetUserBalanceUseCase) {
    this.getUserBalanceUseCase = getUserBalanceUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const userId = httpRequest.params.id;

      const uuidIsValid = checkIfUuidIsValid(userId);

      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      const balance = await this.getUserBalanceUseCase.execute(userId);
      return okResponse(balance);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
