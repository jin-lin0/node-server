import { Router } from "express";
import userController from "../../controller/user";
const router = Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/findAll", userController.findAll);

router.get("/getMyInfo", userController.getMyInfo);

router.get("/getInfo", userController.getInfo);

router.post("/updateMyPwd", userController.updateMyPwd);

router.post("/updateMyInfo", userController.updateMyInfo);

router.get("/findById", userController.findById);

router.get("/findByNickname", userController.findByNickname);
router.get("/", function (req, res, next) {
  res.send("user");
});

export default router;
