import { prisma } from "@/db/prisma";

interface GetUserByEmailRepositoryOutput {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class GetUserByEmailRepository {
  async execute(email: string): Promise<GetUserByEmailRepositoryOutput | null> {
    return await prisma.user.findUnique({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
      },
      where: {
        email: email,
      },
    });
  }
}
