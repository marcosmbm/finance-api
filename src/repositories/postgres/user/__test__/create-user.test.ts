import { describe, expect, it } from "@jest/globals";
import { CreateUserRepository } from "../create-user";
import { fixtureUser } from "@/tests";

describe("Create user repository test", () => {
  it("should create a user on db", async () => {
    const sut = new CreateUserRepository();

    const result = await sut.execute(fixtureUser);

    expect(result).not.toBeNull();
    expect(result.id).toBe(fixtureUser.id);
    expect(result.first_name).toBe(fixtureUser.first_name);
    expect(result.last_name).toBe(fixtureUser.last_name);
  });
});
