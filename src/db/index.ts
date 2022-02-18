import mongoose from "mongoose";

const DB_URL = "mongodb://localhost:27017/keyme";

mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Connented to ${DB_URL}`);
});

db.on("error", (err) => {
  console.log(`Connected error: ${err}`);
});

db.on("disconnected", () => {
  console.log(`DisConnected to ${DB_URL}`);
});

export default mongoose;
