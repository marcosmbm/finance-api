import { describe, expect, it, jest } from "@jest/globals";
import { UpdateUserController } from "../update-user";
import { faker } from "@faker-js/faker/.";
import { EmailAlreadyInUseError, UserNotFoundError } from "@/errors";

describe("Update User Controller test", () => {
  interface UpdateUser {
    first_name?: string;
    last_name?: string;
    email?: string;
    id: string;
  }

  class UpdateUserUseCaseStub {
    async execute(user: UpdateUser) {
      return user;
    }
  }

  function makeStub() {
    const updateUserUseCase = new UpdateUserUseCaseStub();

    const updateUserController = new UpdateUserController(
      updateUserUseCase as any,
    );

    return { updateUserController, updateUserUseCase };
  }

  const httpRequest = {
    params: {
      id: faker.string.uuid(),
    },
    body: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
    },
  };

  it("should return 200 when updating a user successfully", async () => {
    const { updateUserController } = makeStub();

    const result = await updateUserController.execute(httpRequest as any);

    expect(result.statusCode).toBe(200);
  });

  it("should return 400 when invalid params is provided", async () => {
    const { updateUserController } = makeStub();

    const result = await updateUserController.execute({
      params: { ...httpRequest.params },
      body: undefined,
    } as any);

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when an invalid email is provided", async () => {
    const { updateUserController } = makeStub();

    const result = await updateUserController.execute({
      params: { ...httpRequest.params },
      body: {
        ...httpRequest.body,
        email: "invalid_email",
      },
    } as any);

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when an invalid user id is provided", async () => {
    const { updateUserController } = makeStub();

    const result = await updateUserController.execute({
      params: {
        id: "1",
      },
      body: {
        ...httpRequest.body,
      },
    } as any);

    expect(result.statusCode).toBe(400);
  });

  it("should return 400 when an invalid param is provided", async () => {
    const { updateUserController } = makeStub();

    const result = await updateUserController.execute({
      params: {
        id: "1",
      },
      body: {
        ...httpRequest.body,
        unallowed_field: "unallowed_value",
      },
    } as any);

    expect(result.statusCode).toBe(400);
  });

  it("should return 404 if UpdateUserUseCase throws UserNotFoundError", async () => {
    const { updateUserController, updateUserUseCase } = makeStub();

    jest.spyOn(updateUserUseCase, "execute").mockImplementationOnce(() => {
      throw new UserNotFoundError(faker.string.uuid());
    });

    const result = await updateUserController.execute(httpRequest as any);

    expect(result.statusCode).toBe(404);
  });

  it("should return 400 if UpdateUserUseCase throws EmailAlreadyInUseError", async () => {
    const { updateUserController, updateUserUseCase } = makeStub();

    jest.spyOn(updateUserUseCase, "execute").mockImplementationOnce(() => {
      throw new EmailAlreadyInUseError(faker.internet.email());
    });

    const result = await updateUserController.execute(httpRequest as any);

    expect(result.statusCode).toBe(400);
  });
});
