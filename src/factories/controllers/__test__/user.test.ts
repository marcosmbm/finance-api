import { describe, expect, it } from "@jest/globals";
import { makeCreateUserController } from "../user";
import { CreateUserController } from "@/controllers";

describe("User controller factories test", () => {
  it("Should return a valid CreateUserController instance", () => {
    expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
  });
});
