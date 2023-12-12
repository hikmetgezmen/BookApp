import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { RoleInfo } from "../constants/roleInfo.js";
import { MODELS } from "../constants/models.js";

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    about: {
      type: String,
    },
    role: {
      type: String,
      enum: [RoleInfo.admin, RoleInfo.user],
      default: RoleInfo.user,
    },
  },
  { timestamps: true }
);

const User = mongoose.model(MODELS.USERS, UserSchema);

export default User;
