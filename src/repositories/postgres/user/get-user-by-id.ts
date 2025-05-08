import { prisma } from "@/db/prisma";

interface GetUserByIdRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export class GetUserByIdRepository {
  async execute(id: string): Promise<GetUserByIdRepositoryOutput | null> {
    return await prisma.user.findUnique({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
      where: {
        id: id,
      },
    });
  }
}
