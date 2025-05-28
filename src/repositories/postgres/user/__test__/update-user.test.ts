import { describe, expect, it } from "@jest/globals";
import { UpdateUserRepository } from "../update-user";
import { prisma } from "@/db/prisma";
import { fixtureUser } from "@/tests";

describe("Update user repository", () => {
  it("should update user on db", async () => {
    const sut = new UpdateUserRepository();

    const user = await prisma.user.create({ data: fixtureUser });

    const updateUserParams = {
      email: fixtureUser.email,
      first_name: fixtureUser.first_name,
      last_name: fixtureUser.last_name,
    };

    const result = await sut.execute(user.id, {
      ...updateUserParams,
    });

    expect(result).not.toBeNull();
    expect(result.email).toBe(updateUserParams.email);
    expect(result.first_name).toBe(updateUserParams.first_name);
    expect(result.last_name).toBe(updateUserParams.last_name);
  });
});
