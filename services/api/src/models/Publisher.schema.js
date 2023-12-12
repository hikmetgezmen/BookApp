import mongoose from "mongoose";
import { MODELS } from "../constants/models.js";
const Schema = mongoose.Schema;

export const PublisherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  { timestamps: true }
);

const Publisher = mongoose.model(MODELS.PUBLISHERS, PublisherSchema);

export default Publisher;
