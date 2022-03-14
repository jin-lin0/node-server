const errorJSON = {
  1001: "该手机号已经注册！",
  1002: "登录失败，不存在该用户！",
  1003: "登录失败，密码错误！",
};

export const errorCode = {
  isRegistered: 1001,
  inexistUser: 1002,
  passwordWrong: 1003,
};

export const getErrorJSON = (code: number) => {
  const msg = errorJSON[code];
  if (msg) {
    return { code, msg };
  }
  return { code: -1, msg: "未定义该错误" };
};
