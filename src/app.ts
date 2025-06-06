import cors from "cors";
import "dotenv/config";
import express from "express";
import "./config/module-alias";

import { router } from "./routes";

import swaggerUi from "swagger-ui-express";

import fs from "node:fs";
import path from "node:path";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../docs/swagger.json"), "utf-8"),
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
