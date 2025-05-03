import { EmailAlreadyInUseError } from "@/errors";
import type {
  CreateUserRepository,
  GetUserByEmailRepository,
} from "@/repositories";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

interface CreateUserUseCaseInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  private createUserRepository: CreateUserRepository;
  private getUserByEmailRepository: GetUserByEmailRepository;

  constructor(
    createUserRepository: CreateUserRepository,
    getUserByEmailRepository: GetUserByEmailRepository,
  ) {
    this.createUserRepository = createUserRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
  }

  async execute(createUserParams: CreateUserUseCaseInput) {
    const user = await this.getUserByEmailRepository.execute(
      createUserParams.email,
    );

    if (user) {
      throw new EmailAlreadyInUseError(createUserParams.email);
    }

    const userId = uuidv4();

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

    const hashedPassword = bcrypt.hashSync(
      createUserParams.password,
      saltRounds,
    );

    return await this.createUserRepository.execute({
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    });
  }
}
