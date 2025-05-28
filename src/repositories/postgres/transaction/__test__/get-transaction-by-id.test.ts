import { GetTransactionByIdRepository } from "../get-transaction-by-id";
import { prisma } from "@/db/prisma";
import { fixtureTransaction, fixtureUser } from "@/tests";
import { expect, describe, it } from "@jest/globals";
import dayjs from "dayjs";

describe("Get transaction by id repository test", () => {
  it("Should return transaction when fetching with id", async () => {
    const sut = new GetTransactionByIdRepository();

    const user = await prisma.user.create({ data: fixtureUser });

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
    expect(result?.name).toBe(transaction.name);
    expect(result?.amount).toBe(Number(transaction.amount));
    expect(dayjs(result?.date).daysInMonth()).toBe(
      dayjs(transaction.date).daysInMonth(),
    );
    expect(dayjs(result?.date).month()).toBe(dayjs(transaction.date).month());
    expect(dayjs(result?.date).year()).toBe(dayjs(transaction.date).year());
  });

  it("Should return null when transaction does not exists", async () => {
    const sut = new GetTransactionByIdRepository();

    const result = await sut.execute(fixtureTransaction.id);

    expect(result).toBeNull();
  });
});
