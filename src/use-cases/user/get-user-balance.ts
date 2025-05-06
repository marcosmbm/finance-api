import { UserNotFoundError } from "@/errors";
import type {
  GetUserBalanceRepository,
  GetUserByIdRepository,
} from "@/repositories";

export class GetUserBalanceUseCase {
  private getUserBalanceRepository: GetUserBalanceRepository;
  private getUserByIdRepository: GetUserByIdRepository;

  constructor(
    getUserBalanceRepository: GetUserBalanceRepository,
    getUserByIdRepository: GetUserByIdRepository,
  ) {
    this.getUserBalanceRepository = getUserBalanceRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(userId: string) {
    const user = await this.getUserByIdRepository.execute(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return await this.getUserBalanceRepository.execute(userId);
  }
}
