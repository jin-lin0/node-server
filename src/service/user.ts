import User from "../models/user";

const callback = (err, res, option = "") => {
  if (err) {
    console.log("Error" + err);
  } else {
    console.log(`${option}操作成功`);
  }
};

export const UserServer = {
  add: (data) => new User(data).save(callback),
  delete: (id) => User.findByIdAndRemove(id, callback),
  updateOne: (id, search, update) => User.updateOne(search, update, callback),
  find: (search, out) => User.find(search, out, callback),
};
