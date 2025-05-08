import { postgresHelper } from "@/db/postgres/client";
import { prisma } from "@/db/prisma";

interface UpdateTransactionRepositoryInput {
  name?: string;
  date?: string;
  amount?: string;
  type?: string;
}

interface UpdateTransactionRepositoryOutput {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
}

export class UpdateTransactionRepository {
  async execute(
    id: string,
    updateTransactionParams: UpdateTransactionRepositoryInput,
  ): Promise<UpdateTransactionRepositoryOutput> {
    const totalFields = Object.entries(updateTransactionParams).filter(
      ([_, value]) => value !== undefined,
    );

    if (totalFields.length === 0) {
      throw new Error("Fields invalid");
    }

    const transaction = await prisma.transaction.update({
      data: {
        ...(updateTransactionParams.amount && {
          amount: updateTransactionParams.amount,
        }),
        ...(updateTransactionParams.name && {
          name: updateTransactionParams.name,
        }),
        ...(updateTransactionParams.type && {
          type:
            updateTransactionParams.type === "EARNING" ? "EARNING" : "EXPENSE",
        }),
        ...(updateTransactionParams.date && {
          date: new Date(updateTransactionParams.date),
        }),
      },
      select: {
        id: true,
        amount: true,
        name: true,
        date: true,
        type: true,
      },
      where: {
        id: id,
      },
    });

    return {
      ...transaction,
      amount: Number(transaction.amount),
    };
  }
}
