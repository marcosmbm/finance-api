import { PasswordInvalidError, UserNotFoundError } from "@/errors";
import { fixtureUser } from "@/tests";
import { describe, expect, it, jest } from "@jest/globals";
import { LoginUserUseCase } from "../login-user";
import { faker } from "@faker-js/faker/.";

describe("Logn user use case test", () => {
  class GetUserByEmailRepositoryStub {
    async execute(email: string) {
      return fixtureUser;
    }
  }

  class HasherAdapterStub {
    async compare(password: string, hash: string) {
      return true;
    }

    async hash(password: string) {
      return password;
    }
  }

  class JwtAdapterStub {
    async sign(): Promise<string> {
      return faker.internet.jwt();
    }
  }

  function makeSut() {
    const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
    const hasherAdapter = new HasherAdapterStub();
    const jwtAdapter = new JwtAdapterStub();

    const sut = new LoginUserUseCase(
      getUserByEmailRepository,
      hasherAdapter as any,
      jwtAdapter as any,
    );

    return { sut, getUserByEmailRepository, hasherAdapter };
  }

  const user = fixtureUser;

  it("should throw UserNotFoundError if getUserByIdRepository not return user", async () => {
    //arrange
    const { sut, getUserByEmailRepository } = makeSut();
    jest
      .spyOn(getUserByEmailRepository, "execute")
      .mockResolvedValueOnce(null as any);

    //act
    const result = sut.execute(user.email, user.password);

    //assert
    await expect(result).rejects.toThrow(new UserNotFoundError(user.email));
  });

  it("should throw PasswordInvalidError if getUserByIdRepository return invalid password", async () => {
    //arrange
    const { sut, hasherAdapter } = makeSut();
    jest.spyOn(hasherAdapter, "compare").mockResolvedValueOnce(false);

    //act
    const result = sut.execute(user.email, user.password);

    //assert
    await expect(result).rejects.toThrow(new PasswordInvalidError());
  });

  it("should return user with tokens when credentials are correct", async () => {
    //arrange
    const { sut } = makeSut();

    const result = await sut.execute(user.email, user.password);

    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });
});
