import Friend from "../models/friend";
import { asyncHandler } from "../util";
import { getErrorJSON } from "../const/errorJSON";

const friendController = {
  add: async (data) => {
    const { userBuild, userReceive } = data;
    if (userBuild === userReceive) {
      return false;
    }
    const friend = await Friend.findOne(data);
    if (!friend) {
      Friend.insertMany(data);
      return true;
    }
    return false;
  },

  delete: async (data) => {
    const { userDelete, userReceive } = data;
    if (userDelete === userReceive) {
      return false;
    }

    const friend = await Friend.deleteMany({
      userBuild: userDelete,
      userReceive,
    });
    console.log(friend);
    return true;
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
