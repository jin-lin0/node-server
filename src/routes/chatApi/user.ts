import { Router } from "express";
import { findAll } from "../../controller/userController";
const router = Router();

router.get("/", function (req, res, next) {
  res.send("user");
});

router.get("/findAll", findAll);

export default router;
