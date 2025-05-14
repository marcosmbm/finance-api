import { describe, expect, it, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { GetUserByIdController } from "../get-user-by-id";
import { UserNotFoundError } from "@/errors";

describe("Get user by id controller test", () => {
  class GetUserByUseCaseStub {
    execute(userId: string) {
      return {
        id: userId,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
      };
    }
  }

  const httpRequest = {
    params: {
      id: faker.string.uuid(),
    },
  };

  function makeSut() {
    const getUserByIdUseCase = new GetUserByUseCaseStub();
    const getUserByIdController = new GetUserByIdController(
      getUserByIdUseCase as any,
    );

    return { getUserByIdController, getUserByIdUseCase };
  }

  it("should return 200 when getting user", async () => {
    const { getUserByIdController } = makeSut();

    //act
    const result = await getUserByIdController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeNull();
  });

  it("should return 400 if id is invalid", async () => {
    const { getUserByIdController } = makeSut();

    //act
    const result = await getUserByIdController.execute({
      parms: {
        id: "1",
      },
    } as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 404 if user not found", async () => {
    const { getUserByIdController, getUserByIdUseCase } = makeSut();

    jest.spyOn(getUserByIdUseCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError(faker.string.uuid());
    });

    //act
    const result = await getUserByIdController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(404);
  });
});
