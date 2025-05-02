import { UserNotFoundError } from "@/errors";
import { GetUserByIdRepository } from "@/repositories";

export class GetUserByIdUseCase {
  async execute(id: string) {
    const repository = new GetUserByIdRepository();
    const user = await repository.execute(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    return user;
  }
}
