import { prisma } from "@/db/prisma";

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
}

export class CreateUserRepository {
  async execute(
    createUserParams: CreateUserRepositoryInput,
  ): Promise<CreateUserRepositoryOutput> {
    return await prisma.user.create({
      data: {
        id: createUserParams.id,
        first_name: createUserParams.first_name,
        last_name: createUserParams.last_name,
        email: createUserParams.email,
        password: createUserParams.password,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });
  }
}
