import { Router } from "express";
import userController from "../../controller/user";
const router = Router();

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/findAll", userController.findAll);

router.get("/getUserInfo", userController.getUserInfo);

router.get("/", function (req, res, next) {
  res.send("user");
});

export default router;
