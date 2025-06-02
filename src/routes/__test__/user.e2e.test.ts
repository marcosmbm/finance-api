import { app } from "@/index";
import { fixtureUser } from "@/tests";
import { describe, expect, it } from "@jest/globals";
import request from "supertest";

describe("User Routes e2e test", () => {
  it("POST /api/users should return 201 when user is created", async () => {
    const response = await request(app).post("/api/users").send({
      first_name: fixtureUser.first_name,
      last_name: fixtureUser.last_name,
      email: fixtureUser.email,
      password: fixtureUser.password,
    });

    expect(response.status).toBe(201);
  });
});
