import { prisma } from "@/db/prisma";

export interface DeleteTransactionRepositoryOutput {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
  user_id: string;
}

export class DeleteTransactionRepository {
  async execute(id: string): Promise<DeleteTransactionRepositoryOutput> {
    const transaction = await prisma.transaction.delete({
      select: {
        id: true,
        amount: true,
        name: true,
        date: true,
        type: true,
        user_id: true,
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
