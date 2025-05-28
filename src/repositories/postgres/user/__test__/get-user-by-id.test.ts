import { describe, expect, it } from "@jest/globals";
import { GetUserByIdRepository } from "../get-user-by-id";
import { prisma } from "@/db/prisma";
import { fixtureUser } from "@/tests";

describe("Get user by id repository", () => {
  it("should get user by id on db", async () => {
    const sut = new GetUserByIdRepository();

    const user = await prisma.user.create({ data: fixtureUser });

    const result = await sut.execute(user.id);

    expect(result).not.toBeNull();
    expect(result?.email).toBe(user.email);
    expect(result?.first_name).toBe(user.first_name);
    expect(result?.last_name).toBe(user.last_name);
    expect(result?.id).toBe(user.id);
  });
});
