import { describe, expect, it, jest } from "@jest/globals";
import { GetUserBalanceRepository } from "../get-user-balance";
import { prisma } from "@/db/prisma";
import { fixtureTransaction, fixtureUser } from "@/tests";

describe("Get user balance repository test", () => {
  it("Should get user balance on db", async () => {
    const sut = new GetUserBalanceRepository();

    const user = await prisma.user.create({ data: fixtureUser });

    const transactionValueEarning = 5000;
    const transactionValueExpense = 2000;

    await prisma.transaction.createMany({
      data: [
        {
          amount: transactionValueEarning,
          type: "EARNING",
          user_id: user.id,
          name: fixtureTransaction.name,
          date: fixtureTransaction.date,
        },
        {
          amount: transactionValueExpense,
          type: "EXPENSE",
          user_id: user.id,
          name: fixtureTransaction.name,
          date: fixtureTransaction.date,
        },
      ],
    });

    const result = await sut.execute(user.id);

    expect(result).toStrictEqual({
      balance: transactionValueEarning - transactionValueExpense,
      earnings: transactionValueEarning,
      expenses: transactionValueExpense,
      user_id: user.id,
    });

    expect(result.earnings).toBe(transactionValueEarning);
    expect(result.expenses).toBe(transactionValueExpense);
    expect(result.balance).toBe(
      transactionValueEarning - transactionValueExpense,
    );
    expect(result.user_id).toBe(user.id);
  });

  it("should return zero values when there is no registered transaction", async () => {
    const sut = new GetUserBalanceRepository();

    const user = await prisma.user.create({ data: fixtureUser });

    const result = await sut.execute(user.id);

    expect(result).toStrictEqual({
      balance: 0,
      earnings: 0,
      expenses: 0,
      user_id: user.id,
    });

    expect(result.earnings).toBe(0);
    expect(result.expenses).toBe(0);
    expect(result.balance).toBe(0);
    expect(result.user_id).toBe(user.id);
  });
});
