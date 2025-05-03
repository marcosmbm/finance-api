import { EmailAlreadyInUseError, UserNotFoundError } from "@/errors";
import type {
  GetUserByEmailRepository,
  UpdateUserRepository,
  GetUserByIdRepository,
} from "@/repositories";

interface UpdateUserUseCaseInput {
  first_name?: string;
  last_name?: string;
  email?: string;
  id: string;
}

export class UpdateUserUseCase {
  private updateUserRepository: UpdateUserRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;
  private getUserByIdRepository: GetUserByIdRepository;

  constructor(
    updateUserRepository: UpdateUserRepository,
    getUserByEmailRepository: GetUserByEmailRepository,
    getUserByIdRepository: GetUserByIdRepository,
  ) {
    this.updateUserRepository = updateUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(updateUserParams: UpdateUserUseCaseInput) {
    const getUserById = await this.getUserByIdRepository.execute(
      updateUserParams.id,
    );

    if (!getUserById) {
      throw new UserNotFoundError(updateUserParams.id);
    }

    if (updateUserParams.email) {
      const user = await this.getUserByEmailRepository.execute(
        updateUserParams.email,
      );

      if (user && user.id !== updateUserParams.id) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const { id, ...restUpdateUserParams } = updateUserParams;
    return await this.updateUserRepository.execute(id, restUpdateUserParams);
  }
}
