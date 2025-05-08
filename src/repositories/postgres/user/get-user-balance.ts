import { prisma } from "@/db/prisma";

interface GetUserBalanceRepositoryOutput {
  earnings: number;
  expenses: number;
  balance: number;
  user_id: string;
}

export class GetUserBalanceRepository {
  async execute(userId: string): Promise<GetUserBalanceRepositoryOutput> {
    const {
      _sum: { amount: _totalErnings },
    } = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: userId,
        type: "EARNING",
      },
    });

    const {
      _sum: { amount: _totalExpenses },
    } = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: userId,
        type: "EXPENSE",
      },
    });

    const totalErnings = Number(_totalErnings ?? 0);
    const totalExpenses = Number(_totalExpenses ?? 0);

    return {
      balance: totalErnings - totalExpenses,
      earnings: totalErnings,
      expenses: totalExpenses,
      user_id: userId,
    };
  }
}
