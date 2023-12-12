import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const UserReadBookSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: MODELS.BOOKS,
    },
    readAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const UserReadBook = mongoose.model(MODELS.USER_READ_BOOKS, UserReadBookSchema);

export default UserReadBook;
