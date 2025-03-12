import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI;
mongoose
  .connect(url)
  .then(() => console.log("database succesfull connected"))
  .catch((err) => console.log("your database not connected:", err));

const db = mongoose.connection;

db.on("disconnected", () => {
  console.log("database disconnected");
});

db.on("error", (error) => {
  console.log("database error" + error);
});

export default db;
