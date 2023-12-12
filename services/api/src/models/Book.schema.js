import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const BookSchema = new Schema(
  {
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    page: {
      type: Number,
      required: [true, "Page is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    rate: {
      type: Number,
      default: 0,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: MODELS.AUTHORS,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: MODELS.CATEGORIES,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: MODELS.PUBLISHERS,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model(MODELS.BOOKS, BookSchema);

export default Book;
