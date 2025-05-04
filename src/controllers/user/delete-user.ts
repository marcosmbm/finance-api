import type { DeleteUserUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  defaultErrorResponse,
  invalidUuidResponse,
  okResponse,
  checkIfUuidIsValid,
} from "../helpers";

export class DeleteUserController {
  private deleteUserUseCase: DeleteUserUseCase;

  constructor(deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const uuidIsValid = checkIfUuidIsValid(id);

      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      const user = await this.deleteUserUseCase.execute(id);

      return okResponse(user);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
