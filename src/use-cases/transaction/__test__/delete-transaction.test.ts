import type {
  DeleteTransactionRepositoryOutput,
  GetTransactionByIdRepositoryOutput,
} from "@/repositories";
import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { DeleteTransactionUseCase } from "../delete-transaction";
import { TransactionNotFoundError } from "@/errors";

describe("Delete transaction test", () => {
  class DeleteTransactionRepositoryStub {
    async execute(id: string): Promise<DeleteTransactionRepositoryOutput> {
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

  function makeSut() {
    const deleteTransactionRepository = new DeleteTransactionRepositoryStub();
    const getTransactionByIdRepository = new GetTransactionByIdRepositoryStub();

    const sut = new DeleteTransactionUseCase(
      deleteTransactionRepository,
      getTransactionByIdRepository,
    );

    return {
      sut,
      deleteTransactionRepository,
      getTransactionByIdRepository,
    };
  }

  const transactionId = faker.string.uuid();

  it("Should successfully create a transaction", async () => {
    //arrange
    const { sut } = makeSut();

    //act
    const result = await sut.execute(transactionId);

    //assert
    expect(result).toBeTruthy();
  });

  it("should throw TransactionNotFoundError if getTransactionByIdRepository not return transaction", async () => {
    //arrange
    const { sut, getTransactionByIdRepository } = makeSut();
    jest.spyOn(getTransactionByIdRepository, "execute").mockResolvedValue(null);

    //act
    const result = sut.execute(transactionId);

    //assert
    await expect(result).rejects.toThrow(
      new TransactionNotFoundError(transactionId),
    );
  });
});
