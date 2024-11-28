import { ObjectId } from "mongoose";

export type TItem = {
  title: string;
  description: string;
  image?: string;
  price: number;
  quantity: number;
  category: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
