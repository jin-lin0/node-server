import Friend from "../models/friend";
import { asyncHandler } from "../util";
import { getErrorJSON } from "../const/errorJSON";

const friendController = {
  add: async (data) => {
    const friend = await Friend.findOne(data);
    if (!friend) {
      Friend.insertMany(data);
      return true;
    }
    return false;
  },
  getMy: async (req, res) => {
    try {
      const { id } = req.query;
      const friends = await Friend.findBuildFriends(id);
      const data: any = [];
      friends.forEach((ele: any) => {
        ele.userReceive && data.push(ele.userReceive);
      });
      if (friends) {
        res.json({
          code: 0,
          msg: "查询好友成功",
          data,
        });
      }
    } catch (e) {
      console.log(e);
      res.json(getErrorJSON(1010));
    }
  },
};

export default friendController;
