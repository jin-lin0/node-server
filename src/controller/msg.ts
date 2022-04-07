import Msg from "../models/msg";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../util";
import { getErrorJSON } from "../const/errorJSON";

const msgController = {
  add: async (msg) => {
    if (msg.sender && msg.receive) {
      const data = await Msg.insertMany(msg);
      return data[0];
    }
  },
  sendMsg: asyncHandler(async (req, res) => {
    const { from, to, content } = req.body;
    const msg = await Msg.create({
      from,
      to,
      content,
    });
    console.log(req.body);
    res.json({ data: req.body });
  }),

  getPrivate: async (req, res) => {
    try {
      const { number, userAId, userBId } = req.query;
      const data = await Msg.find({
        $or: [
          { sender: userAId, receive: userBId },
          { sender: userBId, receive: userAId },
        ],
      });
      return res.json({
        code: 0,
        msg: "查询私聊成功",
        data,
      });
    } catch (e) {
      res.json(getErrorJSON(1030));
    }
  },
};

export default msgController;
