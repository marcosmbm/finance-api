import { postgresHelper } from "@/db/postgres/client";

interface DeleteTransactionRepositoryOutput {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
  user_id: string;
}

export class DeleteTransactionRepository {
  async execute(id: string) {
    const result = await postgresHelper<DeleteTransactionRepositoryOutput>(
      `
        delete from transactions
        where id = $1
        returning id, "name", "date", amount, "type", user_id
    `,
      [id],
    );

    return result[0];
  }
}
