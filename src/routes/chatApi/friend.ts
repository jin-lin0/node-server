import { Router } from "express";
const router = Router();

router.get("/", function (req, res, next) {
  res.send("friend");
});

export default router;
