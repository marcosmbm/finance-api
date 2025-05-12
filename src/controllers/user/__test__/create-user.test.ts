import { describe, it, expect } from "@jest/globals";
import { CreateUserController } from "../create-user";

interface CreateUserUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

describe("Create user controller test", () => {
  class CreateUserUseCaseStub {
    execute(user: CreateUserUser) {
      return {
        id: "1",
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      };
    }
  }

  it("should create an user", async () => {
    //arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCase as any,
    );

    const httpRequest = {
      body: {
        first_name: "teste",
        last_name: "usuario",
        email: "teste@email.com",
        password: "12345678",
      },
    };

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(201);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeNull();
  });
});
