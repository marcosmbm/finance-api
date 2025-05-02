import { postgresHelper } from "@/db/postgres/client";

interface GetUserByIdRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class GetUserByIdRepository {
  async execute(id: string): Promise<GetUserByIdRepositoryOutput | null> {
    const result = await postgresHelper<GetUserByIdRepositoryOutput>(
      `
        select 
            id, 
            first_name, 
            last_name, 
            email
        from users
        where id = $1
    `,
      [id],
    );

    return result[0] || null;
  }
}
