import { app } from "@/app";
import { fixtureTransaction, fixtureUser } from "@/tests";
import { faker } from "@faker-js/faker/.";
import { describe, expect, it } from "@jest/globals";
import dayjs from "dayjs";
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

  it("PATCH /api/users/:id should return 200 when user is updated", async () => {
    const createdUserResponse = await request(app).post("/api/users").send({
      first_name: fixtureUser.first_name,
      last_name: fixtureUser.last_name,
      email: fixtureUser.email,
      password: fixtureUser.password,
    });

    const createdUser = createdUserResponse.body;

    const updatedUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
    };

    const response = await request(app)
      .patch(`/api/users/${createdUser.id}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.first_name).toBe(updatedUser.first_name);
    expect(response.body.last_name).toBe(updatedUser.last_name);
    expect(response.body.email).toBe(updatedUser.email);
  });

  it("DELETE /api/users/:id should return 200 when user is deleted", async () => {
    const createdUserResponse = await request(app).post("/api/users").send({
      first_name: fixtureUser.first_name,
      last_name: fixtureUser.last_name,
      email: fixtureUser.email,
      password: fixtureUser.password,
    });

    const createdUser = createdUserResponse.body;

    const response = await request(app).delete(`/api/users/${createdUser.id}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.first_name).toBe(fixtureUser.first_name);
    expect(response.body.last_name).toBe(fixtureUser.last_name);
    expect(response.body.email).toBe(fixtureUser.email);
  });

  it("GET /api/users/:id/balance should return 200 when user", async () => {
    const createdUserResponse = await request(app).post("/api/users").send({
      first_name: fixtureUser.first_name,
      last_name: fixtureUser.last_name,
      email: fixtureUser.email,
      password: fixtureUser.password,
    });

    const createdUser = createdUserResponse.body;

    const transaction = {
      user_id: createdUser.id,
      amount: fixtureTransaction.amount,
      name: fixtureTransaction.name,
      type: fixtureTransaction.type,
      date: dayjs(fixtureTransaction.date).format("YYYY-MM-DD"),
    };

    await request(app).post("/api/transactions").send(transaction);

    const response = await request(app).get(
      `/api/users/${createdUser.id}/balance`,
    );

    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.earnings).toBe(transaction.amount);
    expect(response.body.balance).toBe(transaction.amount);
    expect(response.body.user_id).toBe(createdUser.id);
  });
});
