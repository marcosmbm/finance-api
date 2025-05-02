import { postgresHelper } from "@/db/postgres/client";

interface GetUserByEmailRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class GetUserByEmailRepository {
  async execute(email: string): Promise<GetUserByEmailRepositoryOutput> {
    const result = await postgresHelper<GetUserByEmailRepositoryOutput>(
      `
        select 
            id, 
            first_name, 
            last_name, 
            email, 
            "password" 
        from users
        where email = $1
    `,
      [email],
    );

    return result[0];
  }
}
