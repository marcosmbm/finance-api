import { describe, expect, it, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { GetUserBalanceController } from "../get-user-balance";
import { UserNotFoundError } from "@/errors";

describe("Get user balance id controller test", () => {
  class GetUserBalanceCaseStub {
    execute(userId: string) {
      return {
        earnings: faker.commerce.price(),
        expenses: faker.commerce.price(),
        balance: faker.commerce.price(),
        user_id: userId,
      };
    }
  }

  const httpRequest = {
    params: {
      id: faker.string.uuid(),
    },
  };

  function makeSut() {
    const getUserBalanceUseCase = new GetUserBalanceCaseStub();
    const getUserBalanceController = new GetUserBalanceController(
      getUserBalanceUseCase as any,
    );

    return { getUserBalanceController, getUserBalanceUseCase };
  }

  it("should return 200 when getting user balance", async () => {
    const { getUserBalanceController } = makeSut();

    //act
    const result = await getUserBalanceController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeNull();
  });

  it("should return 400 if user id is invalid", async () => {
    const { getUserBalanceController } = makeSut();

    //act
    const result = await getUserBalanceController.execute({
      params: {
        id: "1",
      },
    } as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 404 if user not found", async () => {
    const { getUserBalanceController, getUserBalanceUseCase } = makeSut();

    jest.spyOn(getUserBalanceUseCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError(faker.string.uuid());
    });

    //act
    const result = await getUserBalanceController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(404);
  });
});
