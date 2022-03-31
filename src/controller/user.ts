import User from "../models/user";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../util";
import { errorCode, getErrorJSON } from "../const/errorJSON";
import { generateToken } from "../util/token";

const userController = {
  login: asyncHandler(async (req, res, next) => {
    const { phone_number, password } = req.body;
    const user = await User.findOne({ phone_number });
    if (!user) {
      return res.json(getErrorJSON(errorCode.inexistUser));
    }
    if (await bcryptjs.compareSync(password, user.password)) {
      return res.json({
        code: 0,
        msg: "登录成功",
        token: generateToken(user._id),
        data: {
          phone_number: user.phone_number,
          nickname: user.nickname,
        },
      });
    }
    return res.json(getErrorJSON(errorCode.passwordWrong));
  }),

  register: asyncHandler(async (req, res) => {
    const { phone_number, password, nickname } = req.body;
    const userCheck = await User.findOne({ phone_number });
    if (userCheck) {
      return res.json(getErrorJSON(errorCode.isRegistered));
    }
    await User.create({
      phone_number,
      nickname,
      password: bcryptjs.hashSync(password, 10),
      type: 1,
    });
    return res.send({
      code: 0,
      msg: "注册成功 ",
      data: { phone_number, nickname },
    });
  }),

  findAll: (req, res) => {
    User.find({}, { __v: 0, _id: 0 }, (err, val) => {
      if (err) {
        return res.send({
          code: 2001,
          msg: "查询失败" + err,
        });
      }
      return res.send(val);
    });
  },

  getUserInfo: (req, res) => {
    return res.send(req.query);
  },

  getChatList: (req, res) => {
    return res.send(req.query);
  },
};

export default userController;
