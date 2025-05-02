import { EmailAlreadyInUseError, UserNotFoundError } from "@/errors";
import {
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
  async execute(updateUserParams: UpdateUserUseCaseInput) {
    const getUserById = await new GetUserByIdRepository().execute(
      updateUserParams.id,
    );

    if (!getUserById) {
      throw new UserNotFoundError(updateUserParams.id);
    }

    if (updateUserParams.email) {
      const user = await new GetUserByEmailRepository().execute(
        updateUserParams.email,
      );

      if (user && user.id !== updateUserParams.id) {
        throw new EmailAlreadyInUseError(updateUserParams.email);
      }
    }

    const repository = new UpdateUserRepository();

    const { id, ...restUpdateUserParams } = updateUserParams;
    return await repository.execute(id, restUpdateUserParams);
  }
}
