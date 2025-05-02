import { postgresHelper } from "@/db/postgres/client";

interface CreateUserRepositoryInput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface CreateUserRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class CreateUserRepository {
  async execute(
    createUserParams: CreateUserRepositoryInput,
  ): Promise<CreateUserRepositoryOutput> {
    const result = await postgresHelper<CreateUserRepositoryOutput>(
      `
        insert into users (id, first_name, last_name, email, "password")
        values (
            $1,
            $2,
            $3,
            $4,
            $5
        )
        returning id, first_name, last_name, email
    `,
      [
        createUserParams.id,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    return result[0];
  }
}
