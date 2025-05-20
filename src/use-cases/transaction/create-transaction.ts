import { UserNotFoundError } from "@/errors";
import type {
  CreateTransactionRepository,
  GetUserByIdRepository,
} from "@/repositories";

import type { IdGeneratorAdapter } from "@/adapters";

export interface CreateTransactionUseCaseInput {
  user_id: string;
  amount: string;
  name: string;
  type: "EARNING" | "EXPENSE";
  date: Date;
}

export class CreateTransactionUseCase {
  private createTransactionRepository: CreateTransactionRepository;
  private getUserByIdRepository: GetUserByIdRepository;
  private idGeneratorAdapter: IdGeneratorAdapter;

  constructor(
    createTransactionRepository: CreateTransactionRepository,
    getUserByIdRepository: GetUserByIdRepository,
    idGeneratorAdapter: IdGeneratorAdapter,
  ) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
    this.idGeneratorAdapter = idGeneratorAdapter;
  }

  async execute(params: CreateTransactionUseCaseInput) {
    const user = await this.getUserByIdRepository.execute(params.user_id);

    if (!user) {
      throw new UserNotFoundError(params.user_id);
    }

    const transactionId = this.idGeneratorAdapter.execute();

    return await this.createTransactionRepository.execute({
      amount: params.amount.toString(),
      date: params.date.toString(),
      id: transactionId,
      name: params.name,
      type: params.type,
      user_id: params.user_id,
    });
  }
}
