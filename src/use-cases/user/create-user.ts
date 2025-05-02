import { CreateUserRepository } from "@/repositories";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

interface CreateUserUseCaseInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute(createUserParams: CreateUserUseCaseInput) {
    //verificar se o email ja está em uso (TODO)

    //gerar novo id
    const userId = uuidv4();

    //criptografar a senha
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

    const hashedPassword = bcrypt.hashSync(
      createUserParams.password,
      saltRounds,
    );

    //inserir no banco de dados
    const repository = new CreateUserRepository();

    return await repository.execute({
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    });
  }
}
