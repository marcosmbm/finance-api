import { describe, it, expect, jest } from "@jest/globals";
import { CreateUserController } from "../create-user";
import { faker } from "@faker-js/faker";

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
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
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
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
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
        first_name: faker.person.firstName(),
        last_name: "",
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
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
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: "",
        password: faker.internet.password({ length: 7 }),
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
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
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
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
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
