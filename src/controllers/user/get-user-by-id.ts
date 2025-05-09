import type { GetUserByIdUseCase } from "@/use-cases";
import type { Request } from "express";

import { userIdSchema } from "@/schema";
import { defaultErrorResponse, okResponse } from "../helpers";

export class GetUserByIdController {
  private getUserByIdUseCase: GetUserByIdUseCase;

  constructor(getUserByIdUseCase: GetUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const user = userIdSchema.parse({ id });

      const userData = await this.getUserByIdUseCase.execute(user.id);

      return okResponse(userData);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
