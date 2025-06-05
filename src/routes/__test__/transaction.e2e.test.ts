import { app } from "@/app";
import { fixtureTransaction, fixtureUser } from "@/tests";
import { faker } from "@faker-js/faker/.";
import { describe, expect, it } from "@jest/globals";
import dayjs from "dayjs";
import request from "supertest";

describe("Transaction routes e2e tests", () => {
  it("POST /api/transactions should return 201 when creating a transaction successfully", async () => {
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

    const response = await request(app)
      .post("/api/transactions")
      .send(transaction);

    expect(response.status).toBe(201);
    expect(response.body).not.toBeNull();
  });

  it("PATCH /api/transactions/:id should return 200 when update transaction successfully", async () => {
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

    const transactionResponse = await request(app)
      .post("/api/transactions")
      .send(transaction);

    const transactionUpdate = {
      amount: faker.commerce.price(),
    };

    const response = await request(app)
      .patch(`/api/transactions/${transactionResponse.body.id}`)
      .send({
        ...transactionUpdate,
      });

    expect(response.status).toBe(200);
    expect(String(response.body.amount)).toBe(String(transactionUpdate.amount));
  });

  it("DELETE /api/transactions/:id should return 200 when delete transaction successfully", async () => {
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

    const transactionResponse = await request(app)
      .post("/api/transactions")
      .send(transaction);

    const response = await request(app).delete(
      `/api/transactions/${transactionResponse.body.id}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
  });
});
