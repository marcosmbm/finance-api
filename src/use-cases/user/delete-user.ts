import { UserNotFoundError } from "@/errors";
import { DeleteUserRepository, GetUserByIdRepository } from "@/repositories";

export class DeleteUserUseCase {
  async execute(id: string) {
    const getUserByIdRepository = new GetUserByIdRepository();
    const user = await getUserByIdRepository.execute(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    const deleteUserRepository = new DeleteUserRepository();
    return await deleteUserRepository.execute(id);
  }
}
