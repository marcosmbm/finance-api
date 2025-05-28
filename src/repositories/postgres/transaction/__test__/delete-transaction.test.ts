import { describe, expect, it } from "@jest/globals";
import { DeleteTransactionRepository } from "../delete-transaction";
import { prisma } from "@/db/prisma";
import { fixtureTransaction, fixtureUser } from "@/tests";

describe("Delete transaction repository test", () => {
  it("Should delete transacion on db", async () => {
    const sut = new DeleteTransactionRepository();

    const user = await prisma.user.create({
      data: fixtureUser,
    });

    const transaction = await prisma.transaction.create({
      data: {
        amount: fixtureTransaction.amount,
        date: fixtureTransaction.date,
        id: fixtureTransaction.id,
        name: fixtureTransaction.name,
        type: "EARNING",
        user_id: user.id,
      },
    });

    const result = await sut.execute(transaction.id);

    expect(result).not.toBeNull();
  });
});
