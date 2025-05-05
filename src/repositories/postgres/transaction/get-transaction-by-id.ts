import { postgresHelper } from "@/db/postgres/client";

interface GetTransactionByIdRepositoryOutput {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
  user_id: string;
}

export class GetTransactionByIdRepository {
  async execute(id: string): Promise<GetTransactionByIdRepositoryOutput> {
    const result = await postgresHelper<GetTransactionByIdRepositoryOutput>(
      `
      select 
        t.id,
        t."name",
        t."date",
        t.amount,
        t."type",
        t.user_id
      from transactions t 
      where t.id = $1
    `,
      [id],
    );

    return result[0];
  }
}
