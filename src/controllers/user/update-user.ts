import type { UpdateUserUseCase } from "@/use-cases";
import type { Request } from "express";
import {
  defaultErrorResponse,
  invalidParamsResponse,
  okResponse,
} from "../helpers";

import { updateUserSchema } from "@/schema";

export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;

  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;
      const data = httpRequest.body;

      if (!data) {
        return invalidParamsResponse();
      }

      const user = updateUserSchema.parse({ id, ...data });

      const createdUser = await this.updateUserUseCase.execute(user);

      return okResponse(createdUser);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
