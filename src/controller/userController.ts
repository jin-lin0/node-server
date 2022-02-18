import bcryptjs from "bcryptjs";
import User from "../models/user";

const generateHash = (pwd) => bcryptjs.hashSync(pwd, 10);

/*
 * 查询所有用户
 */
export const findAll = function (req, res, next) {
  User.find({}, { __v: 0, _id: 0 }, (err, val) => {
    if (err) {
      console.log("查询用户失败!" + err);
      return;
    }
    res.send(val);
  });
};

export const changePassword = function (req, res, next) {};
