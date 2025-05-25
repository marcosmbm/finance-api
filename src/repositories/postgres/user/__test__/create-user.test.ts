import { describe, expect, it, jest } from "@jest/globals";
import { CreateUserRepository } from "../create-user";
import { fixtureUser } from "@/tests";
import { prisma } from "@/db/prisma";

describe("Create user repository test", () => {
  it("should create a user on db", async () => {
    const sut = new CreateUserRepository();

    const result = await sut.execute(fixtureUser);

    expect(result).not.toBeNull();
    expect(result.id).toBe(fixtureUser.id);
    expect(result.first_name).toBe(fixtureUser.first_name);
    expect(result.last_name).toBe(fixtureUser.last_name);
  });

  it("should call prisma with correct params", async () => {
    const sut = new CreateUserRepository();
    const prismaSpy = jest.spyOn(prisma.user, "create");

    await sut.execute(fixtureUser);

    expect(prismaSpy).toHaveBeenCalledWith({
      data: {
        id: fixtureUser.id,
        first_name: fixtureUser.first_name,
        last_name: fixtureUser.last_name,
        email: fixtureUser.email,
        password: fixtureUser.password,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
    });
  });
});
