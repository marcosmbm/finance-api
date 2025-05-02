import { postgresHelper } from "@/db/postgres/client";

interface UpdateUserRepositoryInput {
  first_name?: string;
  last_name?: string;
  email?: string;
}

interface UpdateUserRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class UpdateUserRepository {
  async execute(
    id: string,
    updateUserParams: UpdateUserRepositoryInput,
  ): Promise<UpdateUserRepositoryOutput> {
    const fields: string[] = [];
    const params: string[] = [];

    const keys = Object.keys(updateUserParams);

    let index = 1;
    for (const key of keys) {
      const value = updateUserParams[key as keyof UpdateUserRepositoryInput];

      if (value !== undefined && value.trim() !== "") {
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

    const result = await postgresHelper<UpdateUserRepositoryOutput>(
      `
        update users
        set ${fieldsJoin}
        where id = $${index}
        returning id, first_name, last_name, email
    `,
      [...params, id],
    );

    return result[0];
  }
}
