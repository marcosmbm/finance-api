import { postgresHelper } from "@/db/postgres/client";

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
    const result =
      await postgresHelper<GetTransactionsByUserIdRepositoryOutput>(
        `
      select 
        t.id,
        t."name",
        t."date",
        t.amount,
        t."type"
      from transactions t 
      where t.user_id = $1
      order by "date" desc 
    `,
        [userId],
      );

    return result;
  }
}
