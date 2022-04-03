import { Router } from "express";
import friendController from "../../controller/friend";
const router = Router();

router.get("/getMy", friendController.getMy);

router.get("/", function (req, res, next) {
  res.send("friend");
});

export default router;
