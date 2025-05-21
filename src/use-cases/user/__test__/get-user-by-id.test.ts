import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { UserNotFoundError } from "@/errors";
import { GetUserByIdUseCase } from "../get-user-by-id";
import { fixtureUser } from "@/tests";

describe("Get user by id use case test", () => {
  class GetUserByIdRepositoryStub {
    async execute(id: string) {
      return fixtureUser;
    }
  }

  function makeSut() {
    const getUserByIdRepository = new GetUserByIdRepositoryStub();

    const sut = new GetUserByIdUseCase(getUserByIdRepository);

    return { sut, getUserByIdRepository };
  }

  const userId = faker.string.uuid();

  it("should return a user when searching by id", async () => {
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
