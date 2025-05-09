import type { DeleteUserUseCase } from "@/use-cases";
import type { Request } from "express";

import { defaultErrorResponse, okResponse } from "../helpers";

import { userIdSchema } from "@/schema";

export class DeleteUserController {
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const user = userIdSchema.parse({ id });

      const deletedUser = await this.deleteUserUseCase.execute(user.id);

      return okResponse(deletedUser);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
