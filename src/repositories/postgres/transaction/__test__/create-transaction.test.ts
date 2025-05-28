import { describe, expect, it } from "@jest/globals";
import { CreateTransactionRepository } from "../create-transaction";
import { prisma } from "@/db/prisma";
import { fixtureTransaction, fixtureUser } from "@/tests";
import dayjs from "dayjs";

describe("Create transaction repository test", () => {
  it("should create a transaction on db", async () => {
    const sut = new CreateTransactionRepository();

    const user = await prisma.user.create({ data: fixtureUser });

    const transaction = fixtureTransaction;

    const result = await sut.execute({
      amount: transaction.amount.toString(),
      date: transaction.date.toString(),
      id: transaction.id,
      name: transaction.name,
      type: "EARNING",
      user_id: user.id,
    });

    expect(result).not.toBeNull();
    expect(result.name).toBe(transaction.name);
    expect(result.amount).toBe(transaction.amount);
    expect(dayjs(result.date).daysInMonth()).toBe(
      dayjs(transaction.date).daysInMonth(),
    );
    expect(dayjs(result.date).month()).toBe(dayjs(transaction.date).month());
    expect(dayjs(result.date).year()).toBe(dayjs(transaction.date).year());
  });
});
