import cors from "cors";
import "dotenv/config";
import express from "express";
import "./config/module-alias";

import { router } from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
