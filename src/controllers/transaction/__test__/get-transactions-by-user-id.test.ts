import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { GetTransactionsByUserIdController } from "../get-transactions-by-user-id";
import { UserNotFoundError } from "@/errors";

describe("Get transactions by userId controller", () => {
  class GetTransactionsByUserIdUseCaseSub {
    execute(userId: string) {
      return [
        {
          id: faker.string.uuid(),
          name: faker.commerce.product(),
          date: new Date(),
          amount: faker.finance.amount(),
          type: "EARNING",
        },
      ];
    }
  }

  function makeSut() {
    const getTransactionsByUserIdUseCase =
      new GetTransactionsByUserIdUseCaseSub();

    const getTransactionsByUserIdController =
      new GetTransactionsByUserIdController(
        getTransactionsByUserIdUseCase as any,
      );

    return {
      getTransactionsByUserIdController,
      getTransactionsByUserIdUseCase,
    };
  }

  const httpRequest = {
    query: {
      user_id: faker.string.uuid(),
    },
  };

  it("should return 200 when finding transaction by user id successfully", async () => {
    //arrange
    const { getTransactionsByUserIdController } = makeSut();

    //act
    const response = await getTransactionsByUserIdController.execute(
      httpRequest as any,
    );

    //assert
    expect(response.statusCode).toBe(200);
  });

  it("should return 400 when missing userId param", async () => {
    //arrange
    const { getTransactionsByUserIdController } = makeSut();

    //act
    const response = await getTransactionsByUserIdController.execute({
      query: {
        user_id: "invalid_user_id",
      },
    } as any);

    //assert
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 when invalid userId provided", async () => {
    //arrange
    const { getTransactionsByUserIdController } = makeSut();

    //act
    const response = await getTransactionsByUserIdController.execute({
      query: {
        user_id: "invalid_user_id",
      },
    } as any);

    //assert
    expect(response.statusCode).toBe(400);
  });

  it("should return 404 if GetUserByIdUseCase throws UserNotFoundError", async () => {
    const {
      getTransactionsByUserIdController,
      getTransactionsByUserIdUseCase,
    } = makeSut();

    jest
      .spyOn(getTransactionsByUserIdUseCase, "execute")
      .mockImplementationOnce(() => {
        throw new UserNotFoundError(faker.string.uuid());
      });

    const result = await getTransactionsByUserIdController.execute(
      httpRequest as any,
    );

    expect(result.statusCode).toBe(404);
  });
});
