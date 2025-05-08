import { prisma } from "@/db/prisma";

interface CreateTransactionRepositoryInput {
  id: string;
  user_id: string;
  amount: string;
  name: string;
  type: "EARNING" | "EXPENSE";
  date: string;
}

interface CreateTransactionRepositoryOutput {
  id: string;
  user_id: string;
  amount: number;
  name: string;
  type: string;
  date: Date;
}

export class CreateTransactionRepository {
  async execute(
    params: CreateTransactionRepositoryInput,
  ): Promise<CreateTransactionRepositoryOutput> {
    const transaction = await prisma.transaction.create({
      data: {
        id: params.id,
        amount: params.amount,
        date: new Date(params.date),
        name: params.name,
        type: params.type,
        user_id: params.user_id,
      },
      select: {
        id: true,
        amount: true,
        name: true,
        date: true,
        type: true,
        user_id: true,
      },
    });

    return {
      ...transaction,
      amount: Number(transaction.amount),
    };
  }
}
