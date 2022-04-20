import User from "../models/user";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../util";
import { getErrorJSON } from "../const/errorJSON";
import { generateToken, parseToken } from "../util/token";
import { onLineUser } from "../app";
import Regex from "../util/regex";

const userController = {
  login: asyncHandler(async (req, res, next) => {
    const { phone_number, password } = req.body;
    const user = await User.findOne({ phone_number });
    if (!user) {
      return res.json(getErrorJSON(1002));
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
    return res.json(getErrorJSON(1003));
  }),

  register: asyncHandler(async (req, res) => {
    const { phone_number, password, nickname, avatarUrl } = req.body;
    const userCheck = await User.findOne({ phone_number });
    if (userCheck) {
      return res.json(getErrorJSON(1001));
    }
    await User.create({
      phone_number,
      nickname,
      password: bcryptjs.hashSync(password, 10),
      avatarUrl,
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

  findById: async (req, res) => {
    try {
      const { id } = req.query;
      const user = await User.findById(id, { password: 0 });
      if (!user) {
        return res.json(getErrorJSON(1010));
      }
      return res.json({
        code: 0,
        msg: "查询用户成功",
        data: [user],
      });
    } catch {
      res.json(getErrorJSON(1010));
    }
  },

  getMyInfo: asyncHandler(async (req, res) => {
    const userInfo = await User.findById(
      parseToken(req.headers.authorization),
      { __v: 0, password: 0 }
    );
    if (!userInfo) {
      return res.json(getErrorJSON(1006));
    }
    return res.json({
      code: 0,
      data: userInfo,
    });
  }),

  updateMyInfo: asyncHandler(async (req, res) => {
    const { nickname, phone_number, sex } = req.body;
    if (!Regex.phoneNumber.test(phone_number)) {
      return res.json(getErrorJSON(1041));
    }
    if (!Regex.nickname.test(nickname)) {
      return res.json(getErrorJSON(1042));
    }
    const userId = parseToken(req.headers.authorization);
    const data = await User.findByIdAndUpdate(userId, {
      nickname,
      phone_number,
      sex,
    });
    if (data) {
      return res.json({
        code: 0,
        msg: "修改信息成功！",
        data: {},
      });
    }
  }),

  updateMyPwd: asyncHandler(async (req, res) => {
    const { current_password, password, confirm_password } = req.body;
    const userId = parseToken(req.headers.authorization);
    if (password !== confirm_password) {
      return res.json(getErrorJSON(1020));
    }
    if (!Regex.password.test(password)) {
      return res.json(getErrorJSON(1040));
    }
    const userInfo = await User.findById(userId);
    if (await bcryptjs.compareSync(current_password, userInfo.password)) {
      const newPassword = bcryptjs.hashSync(password, 10);
      const data = await User.findByIdAndUpdate(userId, {
        $set: {
          password: newPassword,
        },
      });
      return res.json({
        code: 0,
        msg: "修改密码成功",
        data: {},
      });
    }
    return res.json(getErrorJSON(1021));
  }),

  getInfo: asyncHandler(async (req, res) => {
    const { id } = req.query;
    const userInfo = await User.findById(id, { __v: 0, password: 0 });
    if (!userInfo) {
      return res.json(getErrorJSON(1006));
    }
    return res.json({
      code: 0,
      data: userInfo,
    });
  }),
};

export default userController;
