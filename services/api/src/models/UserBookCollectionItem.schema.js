import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const UserBookCollectionItemSchema = new Schema(
  {
    userBookCollection: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USER_BOOK_COLLECTIONS,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: MODELS.BOOKS,
    },
  },
  { timestamps: true }
);

const UserBookCollectionItem = mongoose.model(
  MODELS.USER_BOOK_COLLECTION_ITEMS,
  UserBookCollectionItemSchema
);

export default UserBookCollectionItem;
