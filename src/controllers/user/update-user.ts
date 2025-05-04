import type { UpdateUserUseCase } from "@/use-cases";
import type { Request } from "express";
import {
  badRequestResponse,
  defaultErrorResponse,
  okResponse,
  invalidUuidResponse,
  invalidEmailResponse,
  invalidParamsResponse,
  checkIfUuidIsValid,
  checkIfValueIsEmpty,
  checkIfEmailIsValid,
  checkIfHasDisallowedFields,
} from "../helpers";

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

      const uuidIsValid = checkIfUuidIsValid(id);
      if (!uuidIsValid) {
        return invalidUuidResponse();
      }

      const allowedField = ["first_name", "last_name", "email"];
      const hasFieldsNotAllowed = checkIfHasDisallowedFields(
        data,
        allowedField,
      );

      if (hasFieldsNotAllowed) {
        return badRequestResponse("Some provided field not allowed");
      }

      if (data.first_name !== undefined) {
        if (checkIfValueIsEmpty(data.first_name)) {
          return badRequestResponse("First name must not be empty");
        }
      }

      if (data.last_name !== undefined) {
        if (checkIfValueIsEmpty(data.last_name)) {
          return badRequestResponse("Last name must not be empty");
        }
      }

      if (data.email) {
        const emailIsValid = checkIfEmailIsValid(data.email);

        if (!emailIsValid) {
          return invalidEmailResponse();
        }
      }

      const createdUser = await this.updateUserUseCase.execute({
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
