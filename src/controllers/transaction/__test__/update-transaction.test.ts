import { describe, expect, it, jest } from "@jest/globals";
import { UpdateTransactionController } from "../update-transaction";
import type { UpdateTransactionUseCaseInput } from "@/use-cases";

import { faker } from "@faker-js/faker/.";
import { TransactionNotFoundError } from "@/errors";

describe("Update transaction controller test", () => {
  class UpdateTransactionUseCaseStub {
    execute(transaction: UpdateTransactionUseCaseInput) {
      return transaction;
    }
  }

  function makeSut() {
    const updateTransactionUseCase = new UpdateTransactionUseCaseStub();
    const updateTransactionController = new UpdateTransactionController(
      updateTransactionUseCase as any,
    );

    return { updateTransactionController, updateTransactionUseCase };
  }

  const httpRequest = {
    params: {
      id: faker.string.uuid(),
    },
    body: {
      type: "earning",
      name: faker.commerce.product(),
      date: "2025-05-14",
      amount: faker.finance.amount(),
    },
  };

  it("should return 200 when updating a transaction successfully", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute(
      httpRequest as any,
    );

    //assert
    expect(result.statusCode).toBe(200);
  });

  it("should return 200 when only type is not provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        type: undefined,
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(200);
  });

  it("should return 200 when only name is not provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        name: undefined,
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(200);
  });

  it("should return 200 when only date is not provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        date: undefined,
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(200);
  });

  it("should return 200 when only amount is not provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        amount: undefined,
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(200);
  });

  it("should return 400 when invalid params is provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: undefined,
    } as any);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when invalid transaction id is provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: {
        id: "invalid_id",
      },
      body: {
        ...httpRequest.body,
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when invalid name is provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        name: "",
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when invalid transaction type is provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        type: "invalid_type",
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when invalid date is provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        date: "invalid_date",
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when invalid amount is provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        amount: "invalid_amount",
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when unallowed field is provided", async () => {
    //arrange
    const { updateTransactionController } = makeSut();

    //act
    const result = await updateTransactionController.execute({
      params: httpRequest.params,
      body: {
        ...httpRequest.body,
        unallowed_field: "unallowed_value",
      },
    } as any);

    //assert
    expect(result.statusCode).toBe(400);
  });

  it("should return 404 when if UpdateTransactionUseCase throws TransacionNotFoundError", async () => {
    //arrange
    const { updateTransactionController, updateTransactionUseCase } = makeSut();

    jest
      .spyOn(updateTransactionUseCase, "execute")
      .mockImplementationOnce(() => {
        throw new TransactionNotFoundError(faker.string.uuid());
      });

    //act
    const result = await updateTransactionController.execute(
      httpRequest as any,
    );

    //assert
    expect(result.statusCode).toBe(404);
  });
});
