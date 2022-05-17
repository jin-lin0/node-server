import mongoose from "../db/index";

const { Schema, model } = mongoose;

const GroupMsgSchema = new Schema({
  type: { type: String, default: "text" },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "group",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  content: { type: String },
  createTime: { type: Date, default: Date.now() },
  expand: { type: String },
  status: { type: Number, default: 1 }, //0 过期 1 正常
});

GroupMsgSchema.statics.findSenderBySenderId = function (userId, cb) {
  return this.find({ sender: userId }).populate("sender").exec(cb);
};

const GroupMsg = model<any, any>("groupMsg", GroupMsgSchema);

export default GroupMsg;
