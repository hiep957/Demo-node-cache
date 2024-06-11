import mongoose, { ConnectOptions } from "mongoose";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import {errorHandlingMiddleware} from "./middlewares/errorHandlingMiddleware";
import userRoute from "./routes/userRoute";
import "dotenv/config";
const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:hieplaso1@mern-booking-app.ba2nf6u.mongodb.net/Caching",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user",userRoute);
app.get("/api/test", async (req: Request, res: Response) => {
  res.send("Hello World");
});
app.use(errorHandlingMiddleware);
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
