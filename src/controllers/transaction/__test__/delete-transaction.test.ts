import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { DeleteTransactionController } from "../delete-transaction";
import { TransactionNotFoundError } from "@/errors";

describe("Delete transaction controller test", () => {
  class DeleteTrasancationUseCaseSub {
    async execute(id: string) {
      return {
        id: id,
        user_id: faker.string.uuid(),
        amount: faker.finance.amount(),
        name: faker.commerce.productName(),
        type: "earning",
        date: "2025-05-14",
      };
    }
  }

  function makeSut() {
    const deleteTransactionUseCase = new DeleteTrasancationUseCaseSub();
    const deleteTransactionController = new DeleteTransactionController(
      deleteTransactionUseCase as any,
    );

    return {
      deleteTransactionController,
      deleteTransactionUseCase,
    };
  }

  const httpRequest = {
    params: {
      id: faker.string.uuid(),
    },
  };

  it("should return 200 when deleting transaction is successfully", async () => {
    const { deleteTransactionController } = makeSut();

    const response = await deleteTransactionController.execute(
      httpRequest as any,
    );

    expect(response.statusCode).toBe(200);
  });

  it("should return 400 when id is invalid", async () => {
    const { deleteTransactionController } = makeSut();

    const response = await deleteTransactionController.execute({
      params: {
        id: "invalid_id",
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it("should return 404 when transaction not found", async () => {
    const { deleteTransactionController, deleteTransactionUseCase } = makeSut();

    jest
      .spyOn(deleteTransactionUseCase, "execute")
      .mockImplementationOnce(() => {
        throw new TransactionNotFoundError(faker.string.uuid());
      });

    const response = await deleteTransactionController.execute(
      httpRequest as any,
    );

    expect(response.statusCode).toBe(404);
  });
});
