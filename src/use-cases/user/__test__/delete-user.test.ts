import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { DeleteUserUseCase } from "../delete-user";
import { UserNotFoundError } from "@/errors";

describe("Delete user use case test", () => {
  class DeleteUserRepositoryStub {
    async execute(id: string) {
      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
      };
    }
  }

  class GetUserByIdRepositoryStub {
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
    const deleteUserRepository = new DeleteUserRepositoryStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const sut = new DeleteUserUseCase(
      deleteUserRepository,
      getUserByIdRepository,
    );

    return { sut, deleteUserRepository, getUserByIdRepository };
  }

  const userId = faker.string.uuid();

  it("should successfully a delete user", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(userId);

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
    const result = sut.execute(userId);

    //assert
    await expect(result).rejects.toThrow(new UserNotFoundError(userId));
  });
});
