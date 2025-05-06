import { postgresHelper } from "@/db/postgres/client";

interface GetUserBalanceRepositoryOutput {
  earnings: number;
  expenses: number;
  balance: number;
  user_id: string;
}

export class GetUserBalanceRepository {
  async execute(userId: string): Promise<GetUserBalanceRepositoryOutput> {
    const results = await postgresHelper<GetUserBalanceRepositoryOutput>(
      `
        select 
            earnings,
            expenses,
            balance 
        from get_user_balance($1)
      `,
      [userId],
    );

    return {
      ...results[0],
      user_id: userId,
    };
  }
}
