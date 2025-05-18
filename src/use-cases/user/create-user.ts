import { EmailAlreadyInUseError } from "@/errors";
import type {
  CreateUserRepository,
  GetUserByEmailRepository,
} from "@/repositories";

import { v4 as uuidv4 } from "uuid";
import type { HasherAdapter } from "@/adapters";

interface CreateUserUseCaseInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  private createUserRepository: CreateUserRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;
  private hasherAdapter: HasherAdapter;

  constructor(
    createUserRepository: CreateUserRepository,
    getUserByEmailRepository: GetUserByEmailRepository,
    hasherAdapter: HasherAdapter,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.hasherAdapter = hasherAdapter;
  }

  async execute(createUserParams: CreateUserUseCaseInput) {
    const user = await this.getUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (user) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    const userId = uuidv4();

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
