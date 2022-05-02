import Group from "../models/group";
import GroupUser from "../models/groupUser";
import GroupMsg from "../models/groupMsg";
import { asyncHandler } from "../util";
import { getErrorJSON } from "../const/errorJSON";
import { parseToken } from "src/util/token";

const GroupController = {
  register: asyncHandler(async (req, res) => {
    const { nickname, notice, owner } = req.body;
    const groupData = await Group.insertMany({ nickname, notice, owner });
    if (!groupData) {
      return res.json(getErrorJSON(1051));
    }
    const groupUserData = await GroupUser.insertMany({
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
      return res.json(getErrorJSON(1054));
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
      return res.json(getErrorJSON(1054));
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
  addUser: asyncHandler(async (req, res) => {
    const { userId, groupId } = req.body;
    const groupUser = await GroupUser.findOne(userId, groupId);
    if (groupUser) {
      return res.json(getErrorJSON(1053));
    }
    GroupUser.insertMany({ userId, groupId });
    return res.json({ code: 0, msg: "添加成员成功！", data: groupUser });
  }),
};

export default GroupController;
