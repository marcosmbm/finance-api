import type { GetTransactionsByUserIdRepositoryOutput } from "@/repositories";
import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { DeleteTransactionUseCase } from "../delete-transaction";
import { UserNotFoundError } from "@/errors";
import { GetTransactionsByUserIdUseCase } from "../get-transactions-by-user-id";
import { fixtureTransaction, fixtureUser } from "@/tests";

describe("Get transactions by user id test", () => {
  class GetTransactionsByUserIdRepositoryStub {
    async execute(
      id: string,
    ): Promise<GetTransactionsByUserIdRepositoryOutput[]> {
      return [fixtureTransaction];
    }
  }

  class GetUserByIdRepositoryStub {
    async execute(id: string) {
      return fixtureUser;
    }
  }

  function makeSut() {
    const getTransactionsByUserIdRepository =
      new GetTransactionsByUserIdRepositoryStub();

    const getUserByIdRepository = new GetUserByIdRepositoryStub();

    const sut = new GetTransactionsByUserIdUseCase(
      getTransactionsByUserIdRepository,
      getUserByIdRepository,
    );

    return {
      sut,
      getTransactionsByUserIdRepository,
      getUserByIdRepository,
    };
  }

  const userId = faker.string.uuid();

  it("Should successfully create a transaction", async () => {
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
