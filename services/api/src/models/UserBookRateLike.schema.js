import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const UserBookRateLikeSchema = new Schema(
  {
    userBookRate: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USER_BOOK_RATES,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
    type: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserBookRateLike = mongoose.model(
  MODELS.USER_BOOK_RATE_LIKES,
  UserBookRateLikeSchema
);

export default UserBookRateLike;
