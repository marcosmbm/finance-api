import type { GetUserByIdUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  defaultErrorResponse,
  invalidUuidResponse,
  okResponse,
  checkIfUuidIsValid,
} from "../helpers";

export class GetUserByIdController {
  private getUserByIdUseCase: GetUserByIdUseCase;

  constructor(getUserByIdUseCase: GetUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const uuidIsValid = checkIfUuidIsValid(id);

      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      const user = await this.getUserByIdUseCase.execute(id);

      return okResponse(user);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
