import { GetUserByIdUseCase } from "@/use-cases";
import type { Request } from "express";
import validator from "validator";

import {
  badRequestResponse,
  defaultErrorResponse,
  okResponse,
} from "../helpers/response";

export class GetUserByIdController {
  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;

      const uuidIsValid = validator.isUUID(id);

      if (!uuidIsValid) {
        return badRequestResponse("Uuid invalid. Please, provider a valid one");
      }

      const user = await new GetUserByIdUseCase().execute(id);

      return okResponse(user);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
