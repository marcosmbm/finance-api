import { app } from "@/app";
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

  it("GET /api/users/:id should return 200 when user is found", async () => {
    const createdUserResponse = await request(app).post("/api/users").send({
      first_name: fixtureUser.first_name,
      last_name: fixtureUser.last_name,
      email: fixtureUser.email,
      password: fixtureUser.password,
    });

    const createdUser = createdUserResponse.body;

    const response = await request(app).get(`/api/users/${createdUser.id}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.first_name).toBe(fixtureUser.first_name);
    expect(response.body.last_name).toBe(fixtureUser.last_name);
    expect(response.body.email).toBe(fixtureUser.email);
  });
});
