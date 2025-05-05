import { postgresHelper } from "@/db/postgres/client";

interface UpdateTransactionRepositoryInput {
  name?: string;
  date?: string;
  amount?: string;
  type?: string;
}

interface UpdateTransactionRepositoryOutput {
  id: string;
  name: string;
  date: Date;
  amount: number;
  type: string;
}

export class UpdateTransactionRepository {
  async execute(
    id: string,
    updateTransactionParams: UpdateTransactionRepositoryInput,
  ): Promise<UpdateTransactionRepositoryOutput> {
    const fields: string[] = [];
    const params: string[] = [];

    const keys = Object.keys(updateTransactionParams);

    let index = 1;
    for (const key of keys) {
      const value =
        updateTransactionParams[key as keyof UpdateTransactionRepositoryInput];

      if (value !== undefined && value?.trim() !== "") {
        const fieldString = `${key} = $${index}`;
        fields.push(fieldString);
        params.push(value);
        index++;
      }
    }

    if (fields.length === 0) {
      throw new Error("Fields invalid");
    }

    const fieldsJoin = fields.join(", ");

    const result = await postgresHelper<UpdateTransactionRepositoryOutput>(
      `
            update transactions
            set ${fieldsJoin}
            where id = $${index}
            returning id, "name", "date", amount, "type"
        `,
      [...params, id],
    );

    return result[0];
  }
}
