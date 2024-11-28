import mongoose from "mongoose";
import { z } from "zod";

const createItemSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    image: z.string().url("Image must be a valid URL").optional(),
    price: z.number().min(0, "Price must be a positive number"),
    quantity: z.number().min(0, "Quantity must be a positive number"),
    category: z
      .string()
      .refine(
        (val) => mongoose.Types.ObjectId.isValid(val),
        "Category must be a valid ObjectId"
      ),
  }),
});
const updateItemSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title must have at least 1 character").optional(),
    description: z
      .string()
      .min(1, "Description must have at least 1 character")
      .optional(),
    image: z.string().url("Image must be a valid URL").optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    quantity: z
      .number()
      .min(0, "Quantity must be a positive number")
      .optional(),
    category: z
      .string()
      .refine(
        (val) => mongoose.Types.ObjectId.isValid(val),
        "Category must be a valid ObjectId"
      )
      .optional(),
  }),
});

export const ItemValidation = {
  createItemSchema,
  updateItemSchema,
};
