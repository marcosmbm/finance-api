import { EmailAlreadyInUseError } from "@/errors";
import type {
  CreateUserRepository,
  GetUserByEmailRepository,
} from "@/repositories";

import type { HasherAdapter, IdGeneratorAdapter } from "@/adapters";

export interface CreateUserUseCaseInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  private createUserRepository: CreateUserRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;
  private hasherAdapter: HasherAdapter;
  private idGeneratorAdapter: IdGeneratorAdapter;

  constructor(
    createUserRepository: CreateUserRepository,
    getUserByEmailRepository: GetUserByEmailRepository,
    hasherAdapter: HasherAdapter,
    idGeneratorAdapter: IdGeneratorAdapter,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.hasherAdapter = hasherAdapter;
    this.idGeneratorAdapter = idGeneratorAdapter;
  }

  async execute(createUserParams: CreateUserUseCaseInput) {
    const user = await this.getUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (user) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    const userId = this.idGeneratorAdapter.execute();

    const hashedPassword = await this.hasherAdapter.hash(
      createUserParams.password,
    );

    return await this.createUserRepository.execute({
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    });
  }
}
