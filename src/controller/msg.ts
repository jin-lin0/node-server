import Msg from "../models/msg";
import bcryptjs from "bcryptjs";
import { asyncHandler } from "../util";
import { errorCode, getErrorJSON } from "../const/errorJSON";

const msgController = {
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
};

export default msgController;
