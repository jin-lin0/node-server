import mongoose from "../db/index";

const { Schema, model } = mongoose;

const MsgSchema = new Schema({
  type: { type: String, default: "text" },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  receive: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  content: { type: String },
  createTime: { type: Date, default: Date.now() },
  expand: { type: String },
  status: { type: Number, default: 1 }, //0 过期 1 正常
});

MsgSchema.statics.findSenderBySenderId = function (userId, cb) {
  return this.find({ sender: userId }).populate("sender").exec(cb);
};

const Msg = model("msg", MsgSchema);

export default Msg;
