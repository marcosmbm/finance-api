import type { GetUserBalanceUseCase } from "@/use-cases";
import type { Request } from "express";

import { userIdSchema } from "@/schema";
import { defaultErrorResponse, okResponse } from "../helpers";

export class GetUserBalanceController {
  private getUserBalanceUseCase: GetUserBalanceUseCase;

  constructor(getUserBalanceUseCase: GetUserBalanceUseCase) {
    this.getUserBalanceUseCase = getUserBalanceUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const user = userIdSchema.parse({ id });

      const balance = await this.getUserBalanceUseCase.execute(user.id);
      return okResponse(balance);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
