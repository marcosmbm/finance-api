import { describe, expect, it } from "@jest/globals";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalance,
  makeGetUserByIdController,
  makeUpdateUserController,
} from "../user";
import {
  CreateUserController,
  DeleteUserController,
  GetUserBalanceController,
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

  it("Should return a valid DeleteUserController instance", () => {
    expect(makeDeleteUserController()).toBeInstanceOf(DeleteUserController);
  });

  it("Should return a valid Get User Balance Controller instance", () => {
    expect(makeGetUserBalance()).toBeInstanceOf(GetUserBalanceController);
  });
});
