import { UserNotFoundError } from "@/errors";
import type { GetUserByIdRepository } from "@/repositories";

export class GetUserByIdUseCase {
  private getUserByIdRepository: GetUserByIdRepository;

  constructor(getUserByIdRepository: GetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(id: string) {
    const user = await this.getUserByIdRepository.execute(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    return user;
  }
}
