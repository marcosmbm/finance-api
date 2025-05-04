import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "@/controllers";

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from "@/use-cases";

import {
  CreateUserRepository,
  DeleteUserRepository,
  GetUserByEmailRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from "@/repositories";

export function makeCreateUserController() {
  const createUserRepository = new CreateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
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
