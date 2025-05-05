import { TransactionNotFoundError } from "@/errors";
import type {
  DeleteTransactionRepository,
  GetTransactionByIdRepository,
} from "@/repositories";

export class DeleteTransactionUseCase {
  private deleteTransactionRepository: DeleteTransactionRepository;
  private getTransactionByIdRepository: GetTransactionByIdRepository;

  constructor(
    deleteTransactionRepository: DeleteTransactionRepository,
    getTransactionByIdRepository: GetTransactionByIdRepository,
  ) {
    this.deleteTransactionRepository = deleteTransactionRepository;
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }

  async execute(id: string) {
    const transaction = await this.getTransactionByIdRepository.execute(id);

    if (!transaction) {
      throw new TransactionNotFoundError(id);
    }

    return await this.deleteTransactionRepository.execute(id);
  }
}
