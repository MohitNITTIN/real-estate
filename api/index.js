import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

const url = "mongodb://127.0.0.1:27017/real";

mongoose
  .connect(url)
  .then(() => console.log("connected to database"))
  .catch(() => console.log("connection to database failed"));

app.get("/test", (req, res) => {
  res.json({ message: "hello world" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
