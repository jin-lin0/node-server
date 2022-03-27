import mongoose from "../db/index";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String },
    avatar: { type: String },
    nickname: { type: String },
    sex: { type: String },
    age: { type: Number },
    birth: { type: Date },
    registerTime: { type: Date, default: Date.now() },
    type: { type: Number, default: 1 }, // 账号类型 0 不可用 / 1 正常使用
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
