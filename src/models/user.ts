import mongoose from "../db/index";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const User = model("User", UserSchema);

export default User;
