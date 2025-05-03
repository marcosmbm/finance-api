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

import {
  CreateUserUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from "./use-cases";

import {
  CreateUserRepository,
  GetUserByEmailRepository,
  GetUserByIdRepository,
  UpdateUserRepository,
} from "./repositories";

const port = process.env.SERVER_PORT;
const app = express();
const router = Router();

router.get("/teste", async (_req, res) => {
  res.json({ message: "Connected" });
  return;
});

//users
router.post("/users", async (req, res) => {
  const createUserRepository = new CreateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();

  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  );

  const { statusCode, body } = await new CreateUserController(
    createUserUseCase,
  ).execute(req);

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
  const updateUserRepository = new UpdateUserRepository();
  const getUserByEmailRepository = new GetUserByEmailRepository();
  const getUserByIdRepository = new GetUserByIdRepository();

  const updateUserUseCase = new UpdateUserUseCase(
    updateUserRepository,
    getUserByEmailRepository,
    getUserByIdRepository,
  );

  const { statusCode, body } = await new UpdateUserController(
    updateUserUseCase,
  ).execute(req);
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
