import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserBalance,
  makeGetUserByIdController,
  makeUpdateUserController,
} from "@/factories";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const { statusCode, body } = await makeCreateUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

userRouter.get("/:id", async (req, res) => {
  const { statusCode, body } = await makeGetUserByIdController().execute(req);
  res.status(statusCode).json(body);
  return;
});

userRouter.patch("/:id", async (req, res) => {
  const { statusCode, body } = await makeUpdateUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

userRouter.delete("/:id", async (req, res) => {
  const { statusCode, body } = await makeDeleteUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

userRouter.get("/:id/balance", async (req, res) => {
  const { statusCode, body } = await makeGetUserBalance().execute(req);
  res.status(statusCode).json(body);
  return;
});

export { userRouter };
