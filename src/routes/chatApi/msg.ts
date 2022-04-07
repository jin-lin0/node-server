import { Router } from "express";
import msgController from "../../controller/msg";
const router = Router();

router.post("/sendMsg", msgController.sendMsg);

router.get("/getPrivate", msgController.getPrivate);

router.get("/", function (req, res, next) {
  res.send("msg");
});

export default router;
