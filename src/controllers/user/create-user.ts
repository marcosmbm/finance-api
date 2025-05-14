import type { CreateUserUseCase } from "@/use-cases";
import type { Request } from "express";
import { createdResponse, defaultErrorResponse } from "../helpers";

import { createUserSchema } from "@/schema";

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest: Request) {
    try {
      const data = httpRequest.body;

      const user = createUserSchema.parse(data);

      const createdUser = await this.createUserUseCase.execute(user);

      return createdResponse(createdUser);
    } catch (error) {
      return defaultErrorResponse(error);
    }
  }
}
