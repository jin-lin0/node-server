import mongoose from "../db/index";

const { Schema, model } = mongoose;

const FriendSchema = new Schema({
  userBuild: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  userReceive: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  buildDate: {
    type: Date,
    default: Date.now(),
  },
});

FriendSchema.statics.findBuildFriends = function (id, cb) {
  return this.find({ userBuild: id })
    .populate({
      path: "userReceive",
      select:
        "avatarUrl createdAt nickname phone_number sex signature signatureColor type",
    })
    .exec(cb);
};

const Friend = model<any, any>("friend", FriendSchema);

export default Friend;
