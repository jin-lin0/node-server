import mongoose from "../db/index";

const { Schema, model } = mongoose;

const GroupUserSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "group",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  buildDate: {
    type: Date,
    default: Date.now(),
  },
});

GroupUserSchema.statics.findGroupsByUserId = function (userId, cb) {
  return this.find({ userId }).populate("groupId").exec(cb);
};

GroupUserSchema.statics.findUsersByGroupId = function (groupId, cb) {
  return this.find({ groupId })
    .populate({ path: "userId", select: "avatarUrl nickname _id" })
    .exec(cb);
};

const GroupUser = model<any, any>("groupUser", GroupUserSchema);

export default GroupUser;
