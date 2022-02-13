const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const generateHash = (pwd) => bcryptjs.hashSync(pwd, 10);

/*
 * 查询所有用户
 */
exports.findAll = function (res) {
  User.find((err, val) => {
    if (err) {
      console.log("查询用户失败!" + err);
      return;
    }
    res.send(val);
  });
};

exports.changePassword = function (req, res) {};
