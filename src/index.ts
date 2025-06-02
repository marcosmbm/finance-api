import cors from "cors";
import "dotenv/config";
import express from "express";
import "./config/module-alias";

import { router } from "./routes";

const port = process.env.SERVER_PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
