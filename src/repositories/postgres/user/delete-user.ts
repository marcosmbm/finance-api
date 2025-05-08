import { prisma } from "@/db/prisma";

interface DeleteUserRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class DeleteUserRepository {
  async execute(id: string): Promise<DeleteUserRepositoryOutput | null> {
    return await prisma.user.delete({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
      where: { id: id },
    });
  }
}
