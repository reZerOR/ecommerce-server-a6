import { Types } from "mongoose";
import { TItem } from "../Item/item.interface";

export interface TReview {
  productId: Types.ObjectId | TItem;
  message: string;
  userId?: string | { name: string };
  createAt?: Date;
  updatedAt?: Date;
  rating: number;
}
