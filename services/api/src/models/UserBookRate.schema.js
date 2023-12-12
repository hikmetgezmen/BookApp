import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const UserBookRateSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: MODELS.BOOKS,
    },
    content: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserBookRate = mongoose.model(MODELS.USER_BOOK_RATES, UserBookRateSchema);

export default UserBookRate;
