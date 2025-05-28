import { describe, it, expect } from "@jest/globals";
import {
  UpdateTransactionRepository,
  type UpdateTransactionRepositoryInput,
} from "../update-transaction";
import { prisma } from "@/db/prisma";
import { fixtureTransaction, fixtureUser } from "@/tests";
import dayjs from "dayjs";

describe("Update transaction repository test", () => {
  it("Should update transaction on db", async () => {
    const sut = new UpdateTransactionRepository();

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

    const updateTransactionParams: UpdateTransactionRepositoryInput = {
      name: fixtureTransaction.name,
      date: fixtureTransaction.date.toString(),
      amount: fixtureTransaction.amount.toString(),
      type: "EXPENSE",
    };

    const result = await sut.execute(transaction.id, updateTransactionParams);

    expect(result).not.toBeNull();
    expect(result).not.toBeNull();
    expect(result.name).toBe(updateTransactionParams.name);
    expect(result.amount).toBe(Number(updateTransactionParams.amount));
    expect(dayjs(result.date).daysInMonth()).toBe(
      dayjs(transaction.date).daysInMonth(),
    );
    expect(dayjs(result.date).month()).toBe(
      dayjs(updateTransactionParams.date).month(),
    );
    expect(dayjs(result.date).year()).toBe(
      dayjs(updateTransactionParams.date).year(),
    );
  });

  it("Should return new error 'Fields invalid' when empty fields improved", async () => {
    const sut = new UpdateTransactionRepository();

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

    const updateTransactionParams: UpdateTransactionRepositoryInput = {
      name: undefined,
      date: undefined,
      amount: undefined,
      type: undefined,
    };

    const promise = sut.execute(transaction.id, updateTransactionParams);

    expect(promise).rejects.toThrow();
  });
});
