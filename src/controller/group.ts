import Group from "../models/group";
import GroupUser from "../models/groupUser";
import GroupMsg from "../models/groupMsg";
import { asyncHandler } from "../util";
import { getErrorJSON } from "../const/errorJSON";
import { parseToken } from "../util/token";

const MAX_GROUP_NUM = 3;

const GroupController = {
  create: asyncHandler(async (req, res) => {
    const { nickname, notice, owner } = req.body;
    if (!nickname || !notice || !owner) {
      return res.json(getErrorJSON(2000));
    }
    const groupNum = await Group.find({ owner }).count();
    if (groupNum >= MAX_GROUP_NUM) {
      return res.json(getErrorJSON(1050));
    }
    const groupData = await Group.insertMany({ nickname, notice, owner });
    if (!groupData) {
      return res.json(getErrorJSON(1051));
    }
    const groupUserData = await GroupUser.insertMany({
      groupNickname: groupData[0].nickname,
      groupId: groupData[0]._id,
      userId: owner,
    });
    if (!groupUserData) {
      return res.json(getErrorJSON(1052));
    }
    return res.json({
      code: 0,
      msg: "创建群聊成功！",
      data: { group: groupData, users: groupUserData },
    });
  }),
  findById: async (req, res) => {
    try {
      const { id } = req.query;
      const group = await Group.findById(id);
      if (!group) {
        return res.json(getErrorJSON(1054));
      }
      return res.json({
        code: 0,
        msg: "查询群聊成功",
        data: [group],
      });
    } catch {
      return res.json(getErrorJSON(1057));
    }
  },

  findByNickname: async (req, res) => {
    try {
      const { nickname } = req.query;
      const groups = await Group.find({ nickname });
      if (!groups || groups.length === 0) {
        return res.json(getErrorJSON(1054));
      }
      return res.json({
        code: 0,
        msg: "查询群聊成功",
        data: groups,
      });
    } catch {
      return res.json(getErrorJSON(1057));
    }
  },
  getMy: asyncHandler(async (req, res) => {
    const myId = parseToken(req.headers.authorization);
    const myGroups = await GroupUser.findGroupsByUserId(myId);
    if (myGroups) {
      return res.json({ code: 0, msg: "查询群聊成功！", data: myGroups });
    }
  }),
  getInfo: asyncHandler(async (req, res) => {
    const { id } = req.query;
    const group = await Group.find({ _id: id });
    if (!group) {
      return res.json(getErrorJSON(1056));
    }
    const users = GroupUser.findUsersByGroupId(id);
    if (!users) {
      return res.json(getErrorJSON(1055));
    }
    return res.json({
      code: 0,
      msg: "获取群聊信息成功！",
      data: { group, users },
    });
  }),
  addUser: async (data) => {
    const { user, group } = data;
    const groupUser = await GroupUser.findOne({ userId: user, groupId: group });
    if (!groupUser) {
      GroupUser.insertMany({ userId: user, groupId: group });
      return true;
    }
    return false;
  },
  addMsg: async (msg) => {
    const data = await GroupMsg.insertMany(msg);
    return data[0];
  },
  delete: async (data) => {
    const { userId, groupId } = data;

    const group = await Group.findOne({ _id: groupId });
    if (String(group.owner) === userId) {
      await Group.deleteMany({ _id: groupId });
      await GroupUser.deleteMany({ groupId });
      return true;
    }

    const deleteUser = await GroupUser.deleteMany({
      userId,
      groupId,
    });
    return true;
  },
  getMsg: async (req, res) => {
    try {
      const { userId, groupId, number } = req.query;
      const data = await GroupMsg.find({ groupId })
        .sort({ _id: -1 })
        .limit(number);
      return res.json({
        code: 0,
        msg: "查询群聊信息成功！",
        data: data.reverse(),
      });
    } catch (e) {
      res.json(getErrorJSON(1056));
    }
  },
};

export default GroupController;
