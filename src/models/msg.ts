import mongoose from "../db/index";

const { Schema, model } = mongoose;

const MsgSchema = new Schema({
  type: { type: String, default: "text" },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  receiveId: { type: String },
  content: { type: String },
  createTime: { type: Date, default: Date.now() },
  expand: { type: String },
});

MsgSchema.statics.findSenderBySenderId = function (userId, cb) {
  return this.find({ senderId: userId }).populate("senderId").exec(cb);
};

const Msg = model("msg", MsgSchema);

export default Msg;
