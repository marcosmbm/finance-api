import { describe, expect, it } from "@jest/globals";
import {
  makeCreateUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from "../user";
import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
} from "@/controllers";

describe("User controller factories test", () => {
  it("Should return a valid CreateUserController instance", () => {
    expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
  });

  it("Should return a valid UpdateUserController instance", () => {
    expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController);
  });

  it("Should return a valid GetUserByIdController instance", () => {
    expect(makeGetUserByIdController()).toBeInstanceOf(GetUserByIdController);
  });
});
