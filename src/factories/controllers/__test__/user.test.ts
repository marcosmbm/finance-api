import { describe, expect, it } from "@jest/globals";
import { makeCreateUserController, makeUpdateUserController } from "../user";
import { CreateUserController, UpdateUserController } from "@/controllers";

describe("User controller factories test", () => {
  it("Should return a valid CreateUserController instance", () => {
    expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
  });

  it("Should return a valid UpdateUserController instance", () => {
    expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController);
  });
});
