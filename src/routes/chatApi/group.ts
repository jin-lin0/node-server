import { Router } from "express";
import groupController from "../../controller/group";
const router = Router();

router.post("/addUser", groupController.addUser);

router.post("/create", groupController.create);

router.get("/findById", groupController.findById);

router.get("/findByNickname", groupController.findByNickname);

router.get("/getMy", groupController.getMy);

router.get("/getInfo", groupController.getInfo);

router.get("/getMsg", groupController.getMsg);

router.get("/", function (req, res, next) {
  res.send("group");
});

export default router;
