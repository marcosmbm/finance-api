import {
  CreateTransactionController,
  GetTransactionsByUserIdController,
} from "@/controllers";

import {
  CreateTransactionRepository,
  GetTransactionsByUserIdRepository,
  GetUserByIdRepository,
} from "@/repositories";

import {
  CreateTransactionUseCase,
  GetTransactionsByUserIdUseCase,
} from "@/use-cases";

export function makeCreateTransactionController() {
  const createTransactionRepository = new CreateTransactionRepository();
  const getUserByIdRepository = new GetUserByIdRepository();

  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository,
  );

  return new CreateTransactionController(createTransactionUseCase);
}

export function makeGetTransactionsByUserIdController() {
  const getTransactionsByUserIdRepository =
    new GetTransactionsByUserIdRepository();

  const getUserByIdRepository = new GetUserByIdRepository();

  const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
    getTransactionsByUserIdRepository,
    getUserByIdRepository,
  );

  return new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);
}
