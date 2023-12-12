import mongoose from "mongoose";
import UserBookCollectionItem from "./UserBookCollectionItem.schema.js";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const UserBookCollectionSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
    },
  },
  { timestamps: true }
);

const UserBookCollection = mongoose.model(
  MODELS.USER_BOOK_COLLECTIONS,
  UserBookCollectionSchema
);

export default UserBookCollection;
