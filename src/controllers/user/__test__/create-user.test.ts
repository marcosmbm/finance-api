import { describe, it, expect, jest } from "@jest/globals";
import { CreateUserController } from "../create-user";
import { faker } from "@faker-js/faker";
import { EmailAlreadyInUseError, UserNotFoundError } from "@/errors";

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

  function makeSut() {
    const createUserUseCase = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(
      createUserUseCase as any,
    );

    return { createUserController, createUserUseCase };
  }

  const httpRequest = {
    body: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 7 }),
    },
  };

  it("should return 201 when a creating a user successfully", async () => {
    const { createUserController } = makeSut();

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(201);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeNull();
  });

  it("should return 400 if first_name is not provider", async () => {
    //arrange
    const { createUserController } = makeSut();

    //act
    const result = await createUserController.execute({
      body: {
        ...httpRequest.body,
        first_name: "",
      },
    } as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if last_name is not provider", async () => {
    //arrange
    const { createUserController } = makeSut();

    //act
    const result = await createUserController.execute({
      body: {
        ...httpRequest.body,
        last_name: "",
      },
    } as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if email is not provider", async () => {
    //arrange
    const { createUserController } = makeSut();

    //act
    const result = await createUserController.execute({
      body: {
        ...httpRequest.body,
        email: "",
      },
    } as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 if password is not provider", async () => {
    //arrange
    const { createUserController } = makeSut();

    //act
    const result = await createUserController.execute({
      body: {
        ...httpRequest.body,
        password: "",
      },
    } as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should call CreateUserUseCase with correct params", async () => {
    //arrange
    const { createUserController, createUserUseCase } = makeSut();

    const excuteSpy = jest.spyOn(createUserUseCase, "execute");

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(201);
    expect(excuteSpy).toHaveBeenCalledWith(httpRequest.body);
    expect(excuteSpy).toHaveBeenCalledTimes(1);
  });

  it("should return 500 if CreateUserUseCase throws", async () => {
    //arrange
    const { createUserController, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, "execute").mockImplementationOnce(() => {
      throw "erro interno";
    });

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(500);
  });

  it("should return 400 if CreateUserUseCase throws EmailsAlreadyInUseError", async () => {
    //arrange
    const { createUserController, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, "execute").mockImplementationOnce(() => {
      throw new EmailAlreadyInUseError(httpRequest.body.email);
    });

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 404 if CreateUserUseCase throws UserNotFoundError", async () => {
    //arrange
    const { createUserController, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError("1");
    });

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(404);
  });

  it("should return 400 if CreateUserUseCase throw new Error", async () => {
    //arrange
    const { createUserController, createUserUseCase } = makeSut();

    jest.spyOn(createUserUseCase, "execute").mockImplementationOnce(() => {
      throw new Error("teste");
    });

    //act
    const result = await createUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(400);
  });
});
