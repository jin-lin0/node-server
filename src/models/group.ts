import mongoose from "../db/index";

const { Schema, model } = mongoose;

const GroupSchema = new Schema({
  type: { type: String, default: "common" }, //common 普通群
  nickname: { type: String, required: true },
  notice: { type: String },
  avatarUrl: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true }, //群主
  buildDate: { type: Date, default: Date.now() },
});

const Group = model<any, any>("group", GroupSchema);

export default Group;
