import mongoose from "../db/index";

const { Schema, model } = mongoose;

const ChatNewsSchema = new Schema({
  chatId: { type: String, required: true },
  type: { type: Number, default: 1 }, // 0 过期 1 文本 2 文件
  from: { type: String, required: true },
  to: { type: String, required: true },
  content: { type: String },
  createTime: { type: Date, default: Date.now() },
  expand: { type: String },
});

const ChatNews = model("ChatNews", ChatNewsSchema);

export default ChatNews;
