import { UserNotFoundError } from "@/errors";
import type {
  CreateTransactionRepository,
  GetUserByIdRepository,
} from "@/repositories";
import { v4 as uuidv4 } from "uuid";

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

  constructor(
    createTransactionRepository: CreateTransactionRepository,
    getUserByIdRepository: GetUserByIdRepository,
  ) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(params: CreateTransactionUseCaseInput) {
    const user = await this.getUserByIdRepository.execute(params.user_id);

    if (!user) {
      throw new UserNotFoundError(params.user_id);
    }

    return await this.createTransactionRepository.execute({
      amount: params.amount.toString(),
      date: params.date.toString(),
      id: uuidv4(),
      name: params.name,
      type: params.type,
      user_id: params.user_id,
    });
  }
}
