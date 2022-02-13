const mongoose = require("../db");

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
