import { prisma } from "@/db/prisma";

interface GetTransactionsByUserIdRepositoryOutput {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
}

export class GetTransactionsByUserIdRepository {
  async execute(
    userId: string,
  ): Promise<GetTransactionsByUserIdRepositoryOutput[]> {
    const transactions = await prisma.transaction.findMany({
      select: {
        id: true,
        amount: true,
        name: true,
        date: true,
        type: true,
        user_id: true,
      },
      where: {
        user_id: userId,
      },
    });

    return transactions.map((transaction) => {
      return {
        ...transaction,
        amount: Number(transaction.amount),
      };
    });
  }
}
