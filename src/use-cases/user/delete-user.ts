import { UserNotFoundError } from "@/errors";
import type {
  DeleteUserRepository,
  GetUserByIdRepository,
} from "@/repositories";

export class DeleteUserUseCase {
  private deleteUserRepository: DeleteUserRepository;
  private getUserByIdRepository: GetUserByIdRepository;

  constructor(
    deleteUserRepository: DeleteUserRepository,
    getUserByIdRepository: GetUserByIdRepository,
  ) {
    this.deleteUserRepository = deleteUserRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(id: string) {
    const user = await this.getUserByIdRepository.execute(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    return await this.deleteUserRepository.execute(id);
  }
}
