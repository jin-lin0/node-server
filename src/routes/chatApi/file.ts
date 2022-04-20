import { Router } from "express";
import { fileUpLoadToOSS } from "../../util/file";
import fileController from "../../controller/file";
const router = Router();

router.post("/upload", fileUpLoadToOSS(), fileController.upload);

router.get("/", function (req, res, next) {
  res.send("file");
});

export default router;
