import { Schema, model } from "mongoose";
import { CategoryDocument } from "./category.interface";

// Define the schema
const CategorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = model<CategoryDocument>(
  "Category",
  CategorySchema
);
