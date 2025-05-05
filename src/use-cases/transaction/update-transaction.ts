import { TransactionNotFoundError } from "@/errors";
import type {
  UpdateTransactionRepository,
  GetTransactionByIdRepository,
} from "@/repositories";

interface UpdateTransactionUseCaseInput {
  id: string;
  name?: string;
  date?: string;
  amount?: string;
  type?: string;
}

export class UpdateTransactionUseCase {
  private updateTransactionRepository: UpdateTransactionRepository;
  private getTransactionByIdRepository: GetTransactionByIdRepository;

  constructor(
    updateTransactionRepository: UpdateTransactionRepository,
    getTransactionByIdRepository: GetTransactionByIdRepository,
  ) {
    this.updateTransactionRepository = updateTransactionRepository;
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }

  async execute(params: UpdateTransactionUseCaseInput) {
    const transaction = await this.getTransactionByIdRepository.execute(
      params.id,
    );

    if (!transaction) {
      throw new TransactionNotFoundError(params.id);
    }

    const { id, ...rest } = params;
    return await this.updateTransactionRepository.execute(id, rest);
  }
}
