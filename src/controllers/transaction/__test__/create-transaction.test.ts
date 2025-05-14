import { describe, expect, it } from "@jest/globals";
import { CreateTransactionController } from "../create-transaction";
import type { CreateTransactionUseCaseInput } from "@/use-cases";
import { faker } from "@faker-js/faker/.";

describe("Create transaction controller test", () => {
  class CreateTransactionUseCaseStub {
    execute(transaction: CreateTransactionUseCaseInput) {
      return transaction;
    }
  }

  function makeSut() {
    const createTransactionUseCase = new CreateTransactionUseCaseStub();
    const createTransactionController = new CreateTransactionController(
      createTransactionUseCase as any,
    );

    return { createTransactionController, createTransactionUseCase };
  }

  const httpRequest = {
    body: {
      user_id: faker.string.uuid(),
      amount: faker.finance.amount(),
      name: faker.commerce.productName(),
      type: "EARNING",
      date: "2025-05-14",
    },
  };

  it("should return 201 when creating transaction succesfully", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute(
      httpRequest as any,
    );

    expect(response.statusCode).toEqual(201);
  });
});
