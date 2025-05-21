import { prisma } from "@/db/prisma";

export interface GetTransactionByIdRepositoryOutput {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
  user_id: string;
}

export class GetTransactionByIdRepository {
  async execute(
    id: string,
  ): Promise<GetTransactionByIdRepositoryOutput | null> {
    const transaction = await prisma.transaction.findUnique({
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

    if (!transaction) {
      return null;
    }

    return {
      ...transaction,
      amount: Number(transaction.amount),
    };
  }
}
