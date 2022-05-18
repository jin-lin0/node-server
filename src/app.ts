import express from "express";
import { createServer } from "http";
import path from "path";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import chatApi from "./routes/chatApi";
import { verifyToken } from "./util/token";
import friendController from "./controller/friend";
import msgController from "./controller/msg";
import GroupController from "./controller/group";
import GroupUser from "./models/groupUser";

const app = express();
const server = createServer(app);
const io = new Server(server);
export const onLineUser = {};
export const onLineGroupUser = {};

const PORT = process.env.port || 5555;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(verifyToken);

app.use("/chatApi", chatApi);

io.on("connection", (socket) => {
  socket.on("online", (val) => {
    if (val) {
      onLineUser[socket.id] = val;

      GroupUser.find({ userId: val._id }, { groupId: 1, _id: 0 }).then(
        (data) => {
          if (Array.isArray(data)) {
            data.forEach((item) => {
              socket.join(String(item.groupId));
            });
          }
        }
      );
    }
    io.emit("onLineUser", onLineUser);
  });

  socket.on("addFriend", async (val) => {
    friendController.add(val).then((res) => {
      io.sockets.to(socket.id).emit("addFriendSuccess", res);
    });
  });

  socket.on("deleteFriend", async (val) => {
    friendController.delete(val).then((res) => {
      io.sockets.to(socket.id).emit("deleteFriendSuccess", res);
    });
  });
  socket.on("deleteGroup", async (val) => {
    GroupController.delete(val).then((res) => {
      io.sockets.to(socket.id).emit("deleteGroupSuccess", res);
    });
  });

  socket.on("sendMsg", (data) => {
    msgController.add(data).then((res) => {
      const receiveSocketId = Object.keys(onLineUser).find(
        (key) => onLineUser[key]._id === data.receive
      );
      if (receiveSocketId) {
        socket.to(receiveSocketId).emit("receiveMsg", data);
      }
    });
  });

  socket.on("sendGroupMsg", (data) => {
    const { groupId } = data;
    GroupController.addMsg(data).then((res) => {
      io.in(groupId).emit("receiveGroupMsg", data);
    });
  });

  socket.on("addGroup", (data) => {
    GroupController.addUser(data).then((res) => {
      io.sockets.to(socket.id).emit("addGroupSuccess", res);
    });
  });

  socket.on("rtcVideoSend", (data) => {
    const { receiveId } = data;
    const receiveSocketId = Object.keys(onLineUser).find(
      (key) => onLineUser[key]._id === receiveId
    );
    if (receiveSocketId) {
      socket.to(receiveSocketId).emit("rtcVideoReceive", data);
    }
  });
  socket.on("rtcVideoReceiveSend", (data) => {
    const { senderId } = data;
    const senderSocketId = Object.keys(onLineUser).find(
      (key) => onLineUser[key]._id === senderId
    );
    if (senderSocketId) {
      io.sockets.to(senderSocketId).emit("rtcVideoSenderReceive", data);
    }
  });

  socket.on("callUser", (data) => {
    const { receiveId } = data;
    const receiveSocketId = Object.keys(onLineUser).find(
      (key) => onLineUser[key]._id === receiveId
    );
    if (receiveSocketId) {
      io.to(receiveSocketId).emit("callUser", data);
    } else {
      io.to(socket.id).emit("callUserError", data);
    }
  });

  socket.on("answerCall", (data) => {
    const { to } = data;
    const senderSocketId = Object.keys(onLineUser).find(
      (key) => onLineUser[key]._id === to
    );
    if (senderSocketId) {
      io.to(senderSocketId).emit("callAccepted", data.signal);
    }
  });

  socket.on("disconnect", (r) => {
    const id = socket.id;
    delete onLineUser[id];
    io.emit("onLineUser", onLineUser);
  });
});

// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

server.listen(PORT, () => {
  console.log(`Running At PORT ${PORT}`);
});
