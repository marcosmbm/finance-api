import { describe, expect, it } from "@jest/globals";
import { GetUserByEmailRepository } from "../get-user-by-email";
import { prisma } from "@/db/prisma";
import { fixtureUser } from "@/tests";

describe("Get user by email repository", () => {
  it("should get user by email on db", async () => {
    const sut = new GetUserByEmailRepository();

    const user = await prisma.user.create({ data: fixtureUser });

    const result = await sut.execute(user.email);

    expect(result).not.toBeNull();
    expect(result?.email).toBe(user.email);
    expect(result?.first_name).toBe(user.first_name);
    expect(result?.last_name).toBe(user.last_name);
    expect(result?.id).toBe(user.id);
  });
});
