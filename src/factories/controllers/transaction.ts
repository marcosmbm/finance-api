import { CreateTransactionController } from "@/controllers";

import {
  CreateTransactionRepository,
  GetUserByIdRepository,
} from "@/repositories";

import { CreateTransactionUseCase } from "@/use-cases";

export function makeCreateTransactionController() {
  const createTransactionRepository = new CreateTransactionRepository();
  const getUserByIdRepository = new GetUserByIdRepository();

  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository,
  );

  return new CreateTransactionController(createTransactionUseCase);
}
