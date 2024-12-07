import { Types } from "mongoose";
import { TItem } from "../Item/item.interface";
import { TUser } from "../User/user.interface";

export type TOrderItem = {
  item: Types.ObjectId | TItem;
  quantity: number;
  price: number;
};

export type TOrderShippingAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type TOrder = {
  user?: Types.ObjectId | TUser;
  items: TOrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  transactionId?: string;
  paymentStatus: "unpaid" | "paid" | "failed";
  shippingAddress: TOrderShippingAddress;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
