import { UserNotFoundError } from "@/errors";
import type {
  GetTransactionsByUserIdRepository,
  GetUserByIdRepository,
} from "@/repositories";

export class GetTransactionsByUserIdUseCase {
  private getTransactionsByUserIdRepository: GetTransactionsByUserIdRepository;
  private getUserByIdRepository: GetUserByIdRepository;

  constructor(
    getTransactionsByUserIdRepository: GetTransactionsByUserIdRepository,
    getUserByIdRepository: GetUserByIdRepository,
  ) {
    this.getTransactionsByUserIdRepository = getTransactionsByUserIdRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(userId: string) {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return await this.getTransactionsByUserIdRepository.execute(userId);
  }
}
