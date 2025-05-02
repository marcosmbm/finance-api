import { CreateUserUseCase } from "@/use-cases";
import type { Request } from "express";
import validator from "validator";

export class CreateUserController {
  async execute(httpRequest: Request) {
    try {
      const data = httpRequest.body;

      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!data[field] || String(data[field]).trim() === "") {
          return {
            statusCode: 400,
            body: {
              message: `Missing param ${field}`,
            },
          };
        }
      }

      const passwordIsValid = validator.isStrongPassword(data.password, {
        minLength: 6,
        minNumbers: 0,
        minSymbols: 0,
        minLowercase: 0,
        minUppercase: 0,
      });

      if (!passwordIsValid) {
        return {
          statusCode: 400,
          body: {
            message: "Password must be at least 6 characters",
          },
        };
      }

      const emailIsValid = validator.isEmail(data.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: {
            message: "Email invalid. Please, provider a valid one",
          },
        };
      }

      const createdUser = await new CreateUserUseCase().execute(data);

      return {
        statusCode: 201,
        body: createdUser,
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: {
          message: "Internal server error",
        },
      };
    }
  }
}
