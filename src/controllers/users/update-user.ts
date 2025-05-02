import { UpdateUserUseCase } from "@/use-cases";
import type { Request } from "express";
import validator from "validator";
import {
  badRequestResponse,
  defaultErrorResponse,
  okResponse,
} from "../helpers/response";

export class UpdateUserController {
  async execute(httpRequest: Request) {
    try {
      const id = httpRequest.params.id;
      const data = httpRequest.body;

      if (!data) {
        return badRequestResponse("Params invalid");
      }

      const uuidIsValid = validator.isUUID(id);
      if (!uuidIsValid) {
        return badRequestResponse("Uuid invalid. Please, provider a valid one");
      }

      const allowedField = ["first_name", "last_name", "email"];
      const someFieldsNotAllowed = Object.keys(data).some(
        (field) => !allowedField.includes(field),
      );

      if (someFieldsNotAllowed) {
        return badRequestResponse("Some provided field not allowed");
      }

      if (data.first_name !== undefined) {
        if (validator.isEmpty(data.first_name)) {
          return badRequestResponse("First name must not be empty");
        }
      }

      if (data.last_name !== undefined) {
        if (validator.isEmpty(data.last_name)) {
          return badRequestResponse("Last name must not be empty");
        }
      }

      if (data.email) {
        const emailIsValid = validator.isEmail(data.email);

        if (!emailIsValid) {
          return badRequestResponse(
            "Email invalid. Please, provider a valid one",
          );
        }
      }

      const createdUser = await new UpdateUserUseCase().execute({
        id,
        ...data,
      });

      return okResponse(createdUser);
    } catch (error) {
      console.error(error);
      return defaultErrorResponse(error);
    }
  }
}
