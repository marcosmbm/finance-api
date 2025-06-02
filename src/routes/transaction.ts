import {
  makeCreateTransactionController,
  makeDeleteTransactionController,
  makeGetTransactionsByUserIdController,
  makeUpdateTransactionController,
} from "@/factories";
import { Router } from "express";

const transactionRouter = Router();

transactionRouter.post("/", async (req, res) => {
  const { statusCode, body } =
    await makeCreateTransactionController().execute(req);

  res.status(statusCode).json(body);
  return;
});

transactionRouter.get("/", async (req, res) => {
  const { statusCode, body } =
    await makeGetTransactionsByUserIdController().execute(req);

  res.status(statusCode).json(body);
  return;
});

transactionRouter.patch("/:id", async (req, res) => {
  const { statusCode, body } =
    await makeUpdateTransactionController().execute(req);

  res.status(statusCode).json(body);
  return;
});

transactionRouter.delete("/:id", async (req, res) => {
  const { statusCode, body } =
    await makeDeleteTransactionController().execute(req);

  res.status(statusCode).json(body);
  return;
});

export { transactionRouter };
