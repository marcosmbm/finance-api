import { Router } from "express";

import { userRouter } from "./user";
import { transactionRouter } from "./transaction";

const router = Router();

router.get("/teste", async (_req, res) => {
  res.json({ message: "Connected" });
  return;
});

router.use("/users", userRouter);
router.use("/transactions", transactionRouter);

export { router };
