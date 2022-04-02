const errorJSON = {
  1001: "该手机号已经注册！",
  1002: "登录失败，不存在该用户！",
  1003: "登录失败，密码错误！",
  1004: "登录过期，请重新登录!",
  1005: "用户未登录",
  1006: "获取用户详情失败！",
  1010: "查询用户失败",
};

export const getErrorJSON = (code: number) => {
  const msg = errorJSON[code];
  if (msg) {
    return { code, msg };
  }
  return { code: -1, msg: "未定义该错误" };
};
