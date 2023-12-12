import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { timestamps: true }
);

const Category = mongoose.model(MODELS.CATEGORIES, CategorySchema);

export default Category;
