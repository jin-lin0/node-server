import mongoose from "../db/index";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  phone_number: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String },
  avatar: { type: String },
});

const User = model("User", UserSchema);

export default User;
