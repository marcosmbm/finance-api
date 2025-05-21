import type {
  UpdateUserRepositoryInput,
  UpdateUserRepositoryOutput,
} from "@/repositories";
import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { UpdateUserUseCase, type UpdateUserUseCaseInput } from "../update-user";
import { EmailAlreadyInUseError, UserNotFoundError } from "@/errors";

describe("Update user use case test", () => {
  class UpdateUserRepositorySub {
    async execute(
      id: string,
      params: UpdateUserRepositoryInput,
    ): Promise<UpdateUserRepositoryOutput> {
      return {
        id: id,
        first_name: params.first_name as string,
        last_name: params.last_name as string,
        email: params.email as string,
      };
    }
  }

  class GetUserByEmailRepositorySub {
    async execute(email: string): Promise<null | {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    }> {
      return null;
    }
  }

  class GetUserByIdRepositorySub {
    async execute(id: string) {
      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
      };
    }
  }

  function makeSut() {
    const updateUserRepository = new UpdateUserRepositorySub();
    const getUserByEmailRepository = new GetUserByEmailRepositorySub();
    const getUserByIdRepository = new GetUserByIdRepositorySub();

    const sut = new UpdateUserUseCase(
      updateUserRepository,
      getUserByEmailRepository,
      getUserByIdRepository,
    );

    return {
      sut,
      updateUserRepository,
      getUserByEmailRepository,
      getUserByIdRepository,
    };
  }

  const user: UpdateUserUseCaseInput = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
  };

  it("should successfully update a user", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(user);

    //assert
    expect(result).toBeTruthy();
  });

  it("should throw UserNotFoundError if getUserByIdRepository not return user", async () => {
    //arrange
    const { sut, getUserByIdRepository } = makeSut();
    jest
      .spyOn(getUserByIdRepository, "execute")
      .mockResolvedValueOnce(null as any);

    //act
    const result = sut.execute(user);

    //assert
    await expect(result).rejects.toThrow(new UserNotFoundError(user.id));
  });

  it("should successfully update a user if the returned user id is equal to the given user id", async () => {
    //arrange
    const { sut, getUserByEmailRepository } = makeSut();
    jest.spyOn(getUserByEmailRepository, "execute").mockResolvedValue({
      id: user.id,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: user.email as string,
      password: faker.internet.password(),
    });

    //act
    const result = sut.execute(user);

    //assert
    expect(result).toBeTruthy();
  });

  it("should throw EmailAlreadyInUseError if getUserByEmailRepository return a user", async () => {
    //arrange
    const { sut, getUserByEmailRepository } = makeSut();

    jest.spyOn(getUserByEmailRepository, "execute").mockResolvedValue({
      email: user.email as string,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      id: faker.string.uuid(),
      password: faker.internet.password(),
    });

    //act
    const result = sut.execute(user);

    //assert
    await expect(result).rejects.toThrow(
      new EmailAlreadyInUseError(user.email as string),
    );
  });
});
