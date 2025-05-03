import { postgresHelper } from "@/db/postgres/client";

interface DeleteUserRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class DeleteUserRepository {
  async execute(id: string): Promise<DeleteUserRepositoryOutput | null> {
    const result = await postgresHelper<DeleteUserRepositoryOutput>(
      `
        delete from users
        where id = $1
        returning id, first_name, last_name, email
    `,
      [id],
    );

    return result[0];
  }
}
