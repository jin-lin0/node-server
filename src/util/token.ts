import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../const/config";
import { getErrorJSON } from "../const/errorJSON";

interface JwtPayload {
  _id: string;
}

const authRoutes = {
  noTokenPrefix: ["/upload"],
  noToken: ["/chatApi/user/login", "/chatApi/user/register"],
};

export const generateToken = (_id: string) =>
  jwt.sign({ _id }, TOKEN_SECRET_KEY, { expiresIn: "2h" });

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (
      authRoutes.noTokenPrefix.some((item) =>
        new RegExp(`\^${item}`).test(req.originalUrl)
      ) ||
      authRoutes.noToken.includes(req.originalUrl)
    ) {
      next();
    } else {
      if (token) {
        const { _id } = jwt.verify(token, TOKEN_SECRET_KEY) as JwtPayload;
        if (_id) {
          next();
        } else {
          return res.json(getErrorJSON(1004));
        }
      } else {
        return res.json(getErrorJSON(1005));
      }
    }
  } catch (e) {
    return res.json(getErrorJSON(1004));
  }
};

// 不对外暴露该中间件
export const parseToken = (token) => {
  const { _id } = jwt.verify(token, TOKEN_SECRET_KEY) as JwtPayload;
  return _id;
};
