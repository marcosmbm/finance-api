import { describe, expect, it, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { DeleteUserController } from "../delete-user";
import { UserNotFoundError } from "@/errors";

describe("Delete user controller test", () => {
  class DeleteUserUseCaseStub {
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
    const deleteUserUseCase = new DeleteUserUseCaseStub();
    const deleteUserController = new DeleteUserController(
      deleteUserUseCase as any,
    );

    return { deleteUserController, deleteUserUseCase };
  }

  it("should return 200 when a deleting a user successfully", async () => {
    const { deleteUserController } = makeSut();

    //act
    const result = await deleteUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(200);
    expect(result.body).not.toBeUndefined();
    expect(result.body).not.toBeNull();
  });

  it("should return 400 if id is invalid", async () => {
    const { deleteUserController } = makeSut();

    //act
    const result = await deleteUserController.execute({
      parms: {
        id: "1",
      },
    } as any);

    //expect
    expect(result.statusCode).toBe(400);
  });

  it("should return 404 if user not found", async () => {
    const { deleteUserController, deleteUserUseCase } = makeSut();

    jest.spyOn(deleteUserUseCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError(faker.string.uuid());
    });

    //act
    const result = await deleteUserController.execute(httpRequest as any);

    //expect
    expect(result.statusCode).toBe(404);
  });
});
