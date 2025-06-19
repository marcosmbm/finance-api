import { PasswordInvalidError, UserNotFoundError } from "@/errors";
import type { GetUserByEmailRepository } from "@/repositories";
import type { HasherAdapter, JwtAdapter } from "@/adapters";

export class LoginUserUseCase {
  private getUserByEmailRepository: GetUserByEmailRepository;
  private hasherAdapter: HasherAdapter;
  private jwtAdapter: JwtAdapter;

  constructor(
    getUserByEmailRepository: GetUserByEmailRepository,
    hasherAdapter: HasherAdapter,
    jwtAdapter: JwtAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.hasherAdapter = hasherAdapter;
    this.jwtAdapter = jwtAdapter;
  }

  async execute(email: string, password: string) {
    const user = await this.getUserByEmailRepository.execute(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    const isPasswordValid = await this.hasherAdapter.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new PasswordInvalidError();
    }

    const tokens = {
      accessToken: this.jwtAdapter.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: "15m",
        },
      ),
      refreshToken: this.jwtAdapter.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: "30d",
        },
      ),
    };

    return {
      ...user,
      password: undefined,
      ...tokens,
    };
  }
}
