import { describe, expect, it, jest } from "@jest/globals";
import { CreateUserUseCase, type CreateUserUseCaseInput } from "../create-user";
import { faker } from "@faker-js/faker/.";
import { EmailAlreadyInUseError } from "@/errors";

import { fixtureUser } from "@/tests";

describe("Create user use case test", () => {
  class CreateUserRepository {
    async execute(user: CreateUserUseCaseInput) {
      return {
        ...user,
        id: faker.string.uuid(),
      };
    }
  }

  class GetUserByEmailRepository {
    async execute(): Promise<null | CreateUserUseCaseInput> {
      return null;
    }
  }

  class HasherAdapter {
    async hash(password: string) {
      return "hashed_password";
    }
  }

  class IdGeneratorAdapter {
    async execute() {
      return faker.string.uuid();
    }
  }

  function makeSut() {
    const createUserRepository = new CreateUserRepository();
    const getUserByEmailRepository = new GetUserByEmailRepository();
    const hasherAdapter = new HasherAdapter() as any;
    const idGeneratorAdapter = new IdGeneratorAdapter() as any;

    const sut = new CreateUserUseCase(
      createUserRepository,
      getUserByEmailRepository as any,
      hasherAdapter,
      idGeneratorAdapter,
    );

    return {
      sut,
      createUserRepository,
      getUserByEmailRepository,
      hasherAdapter,
      idGeneratorAdapter,
    };
  }

  const user: CreateUserUseCaseInput = fixtureUser;

  it("should successfully create a user", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(user);

    //assert
    expect(result).toBeTruthy();
  });

  it("should throw an EmailAlreadyInUseError if getUserByEmailRepository returns a user", async () => {
    //arrange
    const { sut, getUserByEmailRepository } = makeSut();
    jest.spyOn(getUserByEmailRepository, "execute").mockResolvedValueOnce(user);

    //act
    const result = sut.execute(user);

    //assert
    await expect(result).rejects.toThrow(
      new EmailAlreadyInUseError(user.email),
    );
  });
});
