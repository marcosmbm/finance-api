import { prisma } from "@/db/prisma";
import { fixtureTransaction, fixtureUser } from "@/tests";
import { describe, expect, it } from "@jest/globals";
import { GetTransactionsByUserIdRepository } from "../get-transactions-by-user-id";

describe("Get transactions by user id repository test", () => {
  it("Should return transactions when fetching with id", async () => {
    const sut = new GetTransactionsByUserIdRepository();

    const user = await prisma.user.create({ data: fixtureUser });

    await prisma.transaction.create({
      data: {
        amount: fixtureTransaction.amount,
        date: fixtureTransaction.date,
        id: fixtureTransaction.id,
        name: fixtureTransaction.name,
        type: "EARNING",
        user_id: user.id,
      },
    });

    const result = await sut.execute(user.id);

    expect(result).not.toBeNull();
    expect(result.length).toBe(1);
  });
});
