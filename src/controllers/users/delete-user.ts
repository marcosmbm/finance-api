import { DeleteUserUseCase } from "@/use-cases";
import type { Request } from "express";

import {
  defaultErrorResponse,
  invalidUuidResponse,
  okResponse,
  checkIfUuidIsValid,
} from "../helpers";

export class DeleteUserController {
  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const uuidIsValid = checkIfUuidIsValid(id);

      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      const user = await new DeleteUserUseCase().execute(id);

      return okResponse(user);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
