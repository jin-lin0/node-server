import express from "express";
import { createServer } from "http";
import path from "path";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import chatApi from "./routes/chatApi";

const app = express();
const server = createServer(app);
const io = new Server(server);
export const onLineUser = {};

const PORT = process.env.port || 5555;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/chatApi", chatApi);

io.on("connection", (socket) => {
  console.log("new Connection");
  socket.on("online", (val) => {
    if (val) {
      onLineUser[socket.id] = {
        phone_number: val.phone_number,
        nickname: val.nickname,
        loginTime: Date.now(),
      };
    }
    io.emit("onLineUser", onLineUser);
  });

  socket.on("click", (data) => {
    console.log(data);
  });
});

// app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

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
