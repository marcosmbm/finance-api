import { prisma } from "@/db/prisma";

export interface UpdateUserRepositoryInput {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface UpdateUserRepositoryOutput {
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
    return await prisma.user.update({
      data: updateUserParams,
      where: {
        id: id,
      },
    });
  }
}
