import type {
  UpdateUserRepositoryInput,
  UpdateUserRepositoryOutput,
} from "@/repositories";
import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { UpdateUserUseCase, type UpdateUserUseCaseInput } from "../update-user";
import { EmailAlreadyInUseError, UserNotFoundError } from "@/errors";
import { fixtureUser } from "@/tests";

describe("Update user use case test", () => {
  class UpdateUserRepositorySub {
    async execute(
      id: string,
      params: UpdateUserRepositoryInput,
    ): Promise<UpdateUserRepositoryOutput> {
      return fixtureUser;
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
      return fixtureUser;
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

  const user: UpdateUserUseCaseInput = fixtureUser;

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
    jest
      .spyOn(getUserByEmailRepository, "execute")
      .mockResolvedValue(user as any);

    //act
    const result = sut.execute(user);

    //assert
    expect(result).toBeTruthy();
  });

  it("should throw EmailAlreadyInUseError if getUserByEmailRepository return a user", async () => {
    //arrange
    const { sut, getUserByEmailRepository } = makeSut();

    jest.spyOn(getUserByEmailRepository, "execute").mockResolvedValue({
      ...(user as any),
      id: faker.string.uuid(),
    });

    //act
    const result = sut.execute(user);

    //assert
    await expect(result).rejects.toThrow(
      new EmailAlreadyInUseError(user.email as string),
    );
  });
});
