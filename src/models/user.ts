import mongoose from "../db/index";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    nickname: { type: String, max: 6 },
    sex: { type: Number, default: 0 }, // 0 未定义 1 男 2 女
    age: { type: Number },
    birth: { type: Date },
    type: { type: Number, default: 1 }, // 账号类型 0 不可用 / 1 正常使用
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
