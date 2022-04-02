import { Router } from "express";
import userRouter from "./user";
import msgRouter from "./msg";
import friendRouter from "./friend";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("chatApi");
});

router.use("/user", userRouter);
router.use("/msg", msgRouter);
router.use("/friend", friendRouter);

export default router;
