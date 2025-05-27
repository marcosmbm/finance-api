import { describe, expect, it, jest } from "@jest/globals";
import { DeleteUserRepository } from "../delete-user";
import { fixtureUser } from "@/tests";
import { prisma } from "@/db/prisma";

describe("Delete user repository test", () => {
  it("should delete a user on db", async () => {
    const sut = new DeleteUserRepository();

    const user = await prisma.user.create({ data: fixtureUser });
    const result = await sut.execute(user.id);

    expect(result).not.toBeNull();
  });

  it("should call prisma with correct params", async () => {
    const sut = new DeleteUserRepository();
    const prismaSpy = jest.spyOn(prisma.user, "delete").mockResolvedValue({
      id: fixtureUser.id,
      first_name: fixtureUser.first_name,
      last_name: fixtureUser.last_name,
      email: fixtureUser.email,
      created_at: new Date(),
      password: fixtureUser.password,
      updated_at: new Date(),
    });

    const userId = fixtureUser.id;
    await sut.execute(userId);

    expect(prismaSpy).toHaveBeenCalledWith({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
      },
      where: { id: userId },
    });
  });
});
