import { CreateUserUseCase } from "@/use-cases";
import type { Request } from "express";
import {
  badRequestResponse,
  checkIfEmailIsValid,
  checkIfFieldsIsInvalid,
  createdResponse,
  defaultErrorResponse,
  invalidEmailResponse,
  invalidPasswordResponse,
} from "../helpers";

export class CreateUserController {
  async execute(httpRequest: Request) {
    try {
      const data = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];
      const fieldsInvalid = checkIfFieldsIsInvalid(data, requiredFields);

      if (fieldsInvalid) {
        return badRequestResponse(fieldsInvalid);
      }

      const passwordIsValid = checkIfEmailIsValid(data.password);

      if (!passwordIsValid) {
        return invalidPasswordResponse();
      }

      const emailIsValid = checkIfEmailIsValid(data.email);
      if (!emailIsValid) {
        return invalidEmailResponse();
      }

      const createdUser = await new CreateUserUseCase().execute(data);

      return createdResponse(createdUser);
    } catch (error) {
      console.error(error);
      return defaultErrorResponse(error);
    }
  }
}
