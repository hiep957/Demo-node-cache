import mongoose, { ConnectOptions } from "mongoose";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import userRoute from "./routes/userRoute";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { createClient } from "redis";

const app = express();

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));
client.connect();

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
app.use(
  cors({
    origin: "http://localhost:5173", // specify the client's origin
    credentials: true, // allow credentials
  })
);
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
app.use("/api/user", userRoute);
app.get("/api/test", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/store", async (req, res) => {
  const { key, value } = req.query;

  try {
    await client.set(key as string, value as string);
    return res.send(`Stored ${key}:${value}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error when trying to store data");
  }
});

app.get("/retrieve", async (req, res) => {
  const { key } = req.query;

  try {
    const result = await client.get(key as string);
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error when trying to retrieve data");
  }
});

app.use(errorHandlingMiddleware);
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
