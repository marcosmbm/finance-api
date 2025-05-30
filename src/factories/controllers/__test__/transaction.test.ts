import { describe, expect, it } from "@jest/globals";
import {
  makeCreateTransactionController,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from "../transaction";
import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
  UpdateTransactionController,
} from "@/controllers";

describe("Transaction controller factories test", () => {
  it("Should return a valid CreateTransactionController instance", () => {
    expect(makeCreateTransactionController()).toBeInstanceOf(
      CreateTransactionController,
    );
  });

  it("Should return a valid UpdateTransactionController instance", () => {
    expect(makeUpdateTransactionController()).toBeInstanceOf(
      UpdateTransactionController,
    );
  });

  it("Should return a valid GetTransactionsByUserIdController instance", () => {
    expect(makeGetTransactionsByUserIdController()).toBeInstanceOf(
      GetTransactionsByUserIdController,
    );
  });
});
