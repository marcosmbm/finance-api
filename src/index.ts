import "dotenv/config";
import "./config/module-alias";
import express, { Router } from "express";
import cors from "cors";

import {
  makeCreateTransactionController,
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from "./factories";

const port = process.env.SERVER_PORT;
const app = express();
const router = Router();

router.get("/teste", async (_req, res) => {
  res.json({ message: "Connected" });
  return;
});

//users
router.post("/users", async (req, res) => {
  const { statusCode, body } = await makeCreateUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

router.get("/users/:id", async (req, res) => {
  const { statusCode, body } = await makeGetUserByIdController().execute(req);
  res.status(statusCode).json(body);
  return;
});

router.patch("/users/:id", async (req, res) => {
  const { statusCode, body } = await makeUpdateUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

router.delete("/users/:id", async (req, res) => {
  const { statusCode, body } = await makeDeleteUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

//transactions
router.post("/transactions", async (req, res) => {
  const { statusCode, body } =
    await makeCreateTransactionController().execute(req);

  res.status(statusCode).json(body);
  return;
});

router.get("/transactions", async (req, res) => {
  const { statusCode, body } =
    await makeGetTransactionsByUserIdController().execute(req);

  res.status(statusCode).json(body);
  return;
});

router.patch("/transactions/:id", async (req, res) => {
  const { statusCode, body } =
    await makeUpdateTransactionController().execute(req);

  res.status(statusCode).json(body);
  return;
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
