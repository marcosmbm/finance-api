import { faker } from "@faker-js/faker/.";
import { describe, expect, it, jest } from "@jest/globals";
import { GetUserBalanceUseCase } from "../get-user-balance";
import { UserNotFoundError } from "@/errors";

describe("Get user balance use case test", () => {
  class GetUserBalanceRepositoryStub {
    async execute(userId: string) {
      return {
        balance: Number(faker.finance.amount()),
        earnings: Number(faker.finance.amount()),
        expenses: Number(faker.finance.amount()),
        user_id: userId,
      };
    }
  }

  class GetUserByIdRepositoryStub {
    async execute(id: string) {
      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
      };
    }
  }

  function makeSut() {
    const getUserBalanceRepository = new GetUserBalanceRepositoryStub();
    const getUserByIdRepository = new GetUserByIdRepositoryStub();

    const sut = new GetUserBalanceUseCase(
      getUserBalanceRepository,
      getUserByIdRepository,
    );

    return { sut, getUserBalanceRepository, getUserByIdRepository };
  }

  const userId = faker.string.uuid();

  it("should correctly return the user balance", async () => {
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
