import { describe, it, expect, jest } from "@jest/globals";
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

  it("should return 201 when a creating a user successfully", async () => {
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

  it("should return 400 if first_name is not provider", async () => {
    //arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCase as any,
    );

    const httpRequest = {
      body: {
        first_name: "",
        last_name: "usuario",
        email: "teste@email.com",
        password: "12345678",
      },
    };

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if last_name is not provider", async () => {
    //arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCase as any,
    );

    const httpRequest = {
      body: {
        first_name: "teste",
        last_name: "",
        email: "teste@email.com",
        password: "12345678",
      },
    };

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not provider", async () => {
    //arrange
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCase as any,
    );

    const httpRequest = {
      body: {
        first_name: "teste",
        last_name: "usuario",
        email: "",
        password: "12345678",
      },
    };

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if password is not provider", async () => {
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
        password: "",
      },
    };

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should call CreateUserUseCase with correct params", async () => {
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

    const excuteSpy = jest.spyOn(createUserUseCase, "execute");

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(201);
    expect(excuteSpy).toHaveBeenCalledWith(httpRequest.body);
    expect(excuteSpy).toHaveBeenCalledTimes(1);
  });
});
