import { postgresHelper } from "@/db/postgres/client";

interface CreateTransactionRepositoryInput {
  id: string;
  user_id: string;
  amount: string;
  name: string;
  type: string;
  date: string;
}

interface CreateTransactionRepositoryOutput {
  id: string;
  user_id: string;
  amount: string;
  name: number;
  type: string;
  date: Date;
}

export class CreateTransactionRepository {
  async execute(
    params: CreateTransactionRepositoryInput,
  ): Promise<CreateTransactionRepositoryOutput> {
    const result = await postgresHelper<CreateTransactionRepositoryOutput>(
      `
        insert into transactions (id, user_id, amount , "name" , "type" , "date"  )
        values (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        )
        returning id, user_id, amount , "name" , "type" , "date"    
    `,
      [
        params.id,
        params.user_id,
        params.amount,
        params.name,
        params.type,
        params.date,
      ],
    );

    return result[0];
  }
}
