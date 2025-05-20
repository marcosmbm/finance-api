import {
  CreateUserController,
  DeleteUserController,
  GetUserBalanceController,
  GetUserByIdController,
  UpdateUserController,
} from "@/controllers";

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserBalanceUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from "@/use-cases";

import {
  CreateUserRepository,
  DeleteUserRepository,
  GetUserBalanceRepository,
  GetUserByEmailRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from "@/repositories";

import { HasherAdapter, IdGeneratorAdapter } from "@/adapters";

import { env } from "@/config/env";

export function makeCreateUserController() {
  const createUserRepository = new CreateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const hasherAdapter = new HasherAdapter(env.saltRounds);
  const idGeneratorAdapter = new IdGeneratorAdapter();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
    hasherAdapter,
    idGeneratorAdapter,
  );

  return new CreateUserController(createUserUseCase);
}

export function makeGetUserByIdController() {
  const getUserByIdRepository = new GetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  return new GetUserByIdController(getUserByIdUseCase);
}

export function makeUpdateUserController() {
  const updateUserRepository = new UpdateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const getUserByIdRepository = new GetUserByIdRepository();

  const updateUserUseCase = new UpdateUserUseCase(
    updateUserRepository,
    getUserByEmailRepository,
    getUserByIdRepository,
  );

  return new UpdateUserController(updateUserUseCase);
}

export function makeDeleteUserController() {
  const deleteUserRepository = new DeleteUserRepository();
  const getUserByIdRepository = new GetUserByIdRepository();

  const deleteUserUseCase = new DeleteUserUseCase(
    deleteUserRepository,
    getUserByIdRepository,
  );

  return new DeleteUserController(deleteUserUseCase);
}

export function makeGetUserBalance() {
  const getUserBalanceRepository = new GetUserBalanceRepository();
  const getUserByIdRepository = new GetUserByIdRepository();

  const getUserBalanceUseCase = new GetUserBalanceUseCase(
    getUserBalanceRepository,
    getUserByIdRepository,
  );

  return new GetUserBalanceController(getUserBalanceUseCase);
}
