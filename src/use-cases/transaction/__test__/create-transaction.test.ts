import { describe, expect, it, jest } from "@jest/globals";
import {
  CreateTransactionUseCase,
  type CreateTransactionUseCaseInput,
} from "../create-transaction";
import type {
  CreateTransactionRepositoryInput,
  CreateTransactionRepositoryOutput,
} from "@/repositories";
import { faker } from "@faker-js/faker/.";
import { UserNotFoundError } from "@/errors";
import { fixtureTransaction, fixtureUser } from "@/tests";

describe("Create transaction use case test", () => {
  class CreateTransactionRepositoryStub {
    async execute(
      transaction: CreateTransactionRepositoryInput,
    ): Promise<CreateTransactionRepositoryOutput> {
      return {
        amount: Number(faker.finance.amount()),
        date: new Date(transaction.date),
        id: transaction.id,
        name: transaction.name,
        type: transaction.type,
        user_id: transaction.user_id,
      };
    }
  }

  class GetUserByIdRepositoryStub {
    async execute(id: string) {
      return fixtureUser;
    }
  }
  class IdGeneratorAdapter {
    execute() {
      return faker.string.uuid();
    }
  }

  function makeSut() {
    const createTransactionRepository = new CreateTransactionRepositoryStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();
    const idGeneratorAdapter = new IdGeneratorAdapter();

    const sut = new CreateTransactionUseCase(
      createTransactionRepository,
      getUserByIdRepository,
      idGeneratorAdapter,
    );

    return {
      sut,
      createTransactionRepository,
      getUserByIdRepository,
      idGeneratorAdapter,
    };
  }

  const transaction: CreateTransactionUseCaseInput = {
    ...fixtureTransaction,
    type: "EARNING",
    amount: fixtureTransaction.amount.toString(),
  };

  it("Should successfully create a transaction", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(transaction);

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
    const result = sut.execute(transaction);

    //assert
    await expect(result).rejects.toThrow(
      new UserNotFoundError(transaction.user_id),
    );
  });
});
