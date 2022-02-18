import { Router } from "express";
import userRouter from "./user";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("chatApi");
});

router.use("/user", userRouter);

export default router;
