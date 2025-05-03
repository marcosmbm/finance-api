import "dotenv/config";
import "./config/module-alias";
import express, { Router } from "express";
import cors from "cors";

import {
  CreateUserController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
} from "./controllers";
import { GetUserByIdUseCase } from "./use-cases";
import { GetUserByIdRepository } from "./repositories";

const port = process.env.SERVER_PORT;
const app = express();
const router = Router();

router.get("/teste", async (_req, res) => {
  res.json({ message: "Connected" });
  return;
});

//users
router.post("/users", async (req, res) => {
  const { statusCode, body } = await new CreateUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

router.get("/users/:id", async (req, res) => {
  const getUserByIdRepository = new GetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const { statusCode, body } = await new GetUserByIdController(
    getUserByIdUseCase,
  ).execute(req);
  res.status(statusCode).json(body);
  return;
});

router.patch("/users/:id", async (req, res) => {
  const { statusCode, body } = await new UpdateUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

router.delete("/users/:id", async (req, res) => {
  const { statusCode, body } = await new DeleteUserController().execute(req);
  res.status(statusCode).json(body);
  return;
});

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
