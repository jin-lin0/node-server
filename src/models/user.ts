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
    signature: { type: String, default: "" }, //个性签名
    signatureColor: { type: String, default: "#ABB8C3" },
    type: { type: Number, default: 1 }, // 账号类型 0 不可用 / 1 正常使用
  },
  { timestamps: true }
);

const User = model("user", UserSchema);

export default User;
