import mongoose from "mongoose";
// import { UserType } from "../shared/types";
export type UserType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  date: string;
  phone: string;
  hometown: String;
  role: string;
};
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: " ",
    },
    phone: {
      type: Number,
      default: " ",
    },
    date: {
      type: Date,
      default: "01/01/2001",
    },
    hometown: {
      type: String,
      default: " ",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserType>("User", userSchema);
