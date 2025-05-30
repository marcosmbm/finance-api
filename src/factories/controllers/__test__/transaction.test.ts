import { describe, expect, it } from "@jest/globals";
import {
  makeCreateTransactionController,
  makeUpdateTransactionController,
} from "../transaction";
import {
  CreateTransactionController,
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
});
