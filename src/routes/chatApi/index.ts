import { Router } from "express";
import userRouter from "./user";
import msgRouter from "./msg";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("chatApi");
});

router.use("/user", userRouter);
router.use("/msg", msgRouter);

export default router;
