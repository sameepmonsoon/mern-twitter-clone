import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// userRoutes is the name given to the imported router from user.js
import userRoutes from "./routes/UserRoutes.js";
import authRoutes from "./routes/Authroutes.js";
import tweetRoutes from "../server/routes/Tweetroutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// function to connect express with database
const connect = () => {
  // if any setquery warning comes
  mongoose.set("strictQuery", false);
  //   connecting to the database
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connection Successful");
    })
    .catch((err) => {
      throw err;
    });
};
// get the http request on port 8000 and respond
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(cookieParser);
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);
//listen to the port 8000
app.listen(8000, () => {
  // call the connect function
  connect();
  console.log("listen to Port:", 8000);
});
