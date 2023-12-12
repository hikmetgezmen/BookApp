import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    
  },
  { timestamps: true }
);

const Author = mongoose.model(MODELS.AUTHORS, AuthorSchema);

export default Author;
