import { app } from "@/app";
import { fixtureTransaction, fixtureUser } from "@/tests";
import { describe, expect, it } from "@jest/globals";
import dayjs from "dayjs";
import request from "supertest";

describe("Transaction routes e2e tests", () => {
  it("POST /api/transaction should return 201 when creating a transaction successfully", async () => {
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
});
