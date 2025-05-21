import type { GetTransactionByIdRepositoryOutput } from "@/repositories";
import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import {
  UpdateTransactionUseCase,
  type UpdateTransactionUseCaseInput,
} from "../update-transaction";
import type {
  UpdateTransactionRepositoryInput,
  UpdateTransactionRepositoryOutput,
} from "@/repositories";
import { TransactionNotFoundError } from "@/errors";

describe("Update transaction use case test", () => {
  class GetTransactionByIdRepositoryStub {
    async execute(
      id: string,
    ): Promise<GetTransactionByIdRepositoryOutput | null> {
      return {
        amount: Number(faker.finance.amount()),
        date: faker.date.anytime(),
        name: faker.commerce.productName(),
        type: "EARNING",
        user_id: faker.string.uuid(),
        id: id,
      };
    }
  }

  class UpdateTransactionRepositoryStub {
    async execute(
      id: string,
      params: UpdateTransactionRepositoryInput,
    ): Promise<UpdateTransactionRepositoryOutput> {
      return {
        amount: Number(faker.finance.amount()),
        date: faker.date.anytime(),
        name: faker.commerce.productName(),
        type: "EARNING",
        id: faker.string.uuid(),
      };
    }
  }

  const transaction: UpdateTransactionUseCaseInput = {
    id: faker.string.uuid(),
    amount: faker.finance.amount(),
    date: faker.date.anytime().toString(),
    name: faker.commerce.productName(),
    type: "EARNING",
  };

  function makeSut() {
    const getTransactionByIdRepository = new GetTransactionByIdRepositoryStub();
    const updateTransactionRepository = new UpdateTransactionRepositoryStub();

    const sut = new UpdateTransactionUseCase(
      updateTransactionRepository,
      getTransactionByIdRepository,
    );

    return {
      sut,
      getTransactionByIdRepository,
    };
  }

  it("Should successfully update a transaction", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(transaction);

    //assert
    expect(result).toBeTruthy();
  });

  it("should throw TransactionNotFoundError if getTransactionByIdRepository not return transaction", async () => {
    //arrange
    const { sut, getTransactionByIdRepository } = makeSut();
    jest.spyOn(getTransactionByIdRepository, "execute").mockResolvedValue(null);

    //act
    const result = sut.execute(transaction);

    //assert
    await expect(result).rejects.toThrow(
      new TransactionNotFoundError(transaction.id),
    );
  });
});
