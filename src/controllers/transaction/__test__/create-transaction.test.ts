import { describe, expect, it, jest } from "@jest/globals";
import { CreateTransactionController } from "../create-transaction";
import type { CreateTransactionUseCaseInput } from "@/use-cases";
import { faker } from "@faker-js/faker/.";
import { UserNotFoundError } from "@/errors";

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
      type: "earning",
      date: "2025-05-14",
    },
  };

  it("should return 201 when creating transaction succesfully (earning)", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute(
      httpRequest as any,
    );

    expect(response.statusCode).toEqual(201);
  });

  it("should return 201 when creating transaction succesfully (expense)", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute({
      body: {
        ...httpRequest.body,
        type: "expense",
      },
    } as any);

    expect(response.statusCode).toEqual(201);
  });

  it("should return 400 when body is undefined", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute({
      body: undefined,
    } as any);

    expect(response.statusCode).toEqual(400);
  });

  it("should return 400 when user id is invalid", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute({
      body: {
        ...httpRequest.body,
        user_id: "1",
      },
    } as any);

    expect(response.statusCode).toEqual(400);
  });

  it("should return 400 when name is invalid", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute({
      body: {
        ...httpRequest.body,
        name: "",
      },
    } as any);

    expect(response.statusCode).toEqual(400);
  });

  it("should return 400 when type is invalid", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute({
      body: {
        ...httpRequest.body,
        type: "Invalid type",
      },
    } as any);

    expect(response.statusCode).toEqual(400);
  });

  it("should return 400 when date is invalid", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute({
      body: {
        ...httpRequest.body,
        date: "Invalid date",
      },
    } as any);

    expect(response.statusCode).toEqual(400);
  });

  it("should return 400 when amount is invalid", async () => {
    const { createTransactionController } = makeSut();

    const response = await createTransactionController.execute({
      body: {
        ...httpRequest.body,
        amount: "Invalid amount",
      },
    } as any);

    expect(response.statusCode).toEqual(400);
  });

  it("should return 404 if UpdateUserUseCase throws UserNotFoundError", async () => {
    const { createTransactionController, createTransactionUseCase } = makeSut();

    jest
      .spyOn(createTransactionUseCase, "execute")
      .mockImplementationOnce(() => {
        throw new UserNotFoundError(faker.string.uuid());
      });

    const result = await createTransactionController.execute(
      httpRequest as any,
    );

    expect(result.statusCode).toBe(404);
  });
});
