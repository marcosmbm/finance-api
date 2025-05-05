import {
  CreateTransactionController,
  DeleteTransactionController,
  GetTransactionsByUserIdController,
  UpdateTransactionController,
} from "@/controllers";

import {
  CreateTransactionRepository,
  DeleteTransactionRepository,
  GetTransactionByIdRepository,
  GetTransactionsByUserIdRepository,
  GetUserByIdRepository,
  UpdateTransactionRepository,
} from "@/repositories";

import {
  CreateTransactionUseCase,
  DeleteTransactionUseCase,
  GetTransactionsByUserIdUseCase,
  UpdateTransactionUseCase,
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

export function makeUpdateTransactionController() {
  const updateTransactionRepository = new UpdateTransactionRepository();
  const getTransactionByIdRepository = new GetTransactionByIdRepository();

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository,
    getTransactionByIdRepository,
  );

  return new UpdateTransactionController(updateTransactionUseCase);
}

export function makeDeleteTransactionController() {
  const deleteTransactionRepository = new DeleteTransactionRepository();
  const getTransactionByIdRepository = new GetTransactionByIdRepository();

  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    deleteTransactionRepository,
    getTransactionByIdRepository,
  );

  return new DeleteTransactionController(deleteTransactionUseCase);
}
