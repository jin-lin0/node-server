import { Router } from "express";
import groupController from "../../controller/group";
const router = Router();

router.post("/addUser", groupController.addUser);

router.post("/register", groupController.register);

router.get("/findById", groupController.findById);

router.get("/getMy", groupController.getMy);

router.get("/getInfo", groupController.getInfo);

router.get("/", function (req, res, next) {
  res.send("group");
});

export default router;
