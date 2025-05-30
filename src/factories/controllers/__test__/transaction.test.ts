import { describe, expect, it } from "@jest/globals";
import { makeCreateTransactionController } from "../transaction";
import { CreateTransactionController } from "@/controllers";

describe("Transaction controller factories test", () => {
  it("Should return a valid CreateTransactionController instance", () => {
    expect(makeCreateTransactionController()).toBeInstanceOf(
      CreateTransactionController,
    );
  });
});
