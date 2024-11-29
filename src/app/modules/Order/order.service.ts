import mongoose from "mongoose";
import { TOrder } from "./order.interface";
import AppError from "../../errors/AppError";
import { Status } from "better-status-codes";
import ItemModel from "../Item/item.model";
import OrderModel from "./order.model";
import { TUser } from "../User/user.interface";
import { initiatePayment, PaymentData } from "../payment/payment.utils";

const createOrder = async (
  payload: TOrder,
  user: Partial<TUser>,
  callback: string
) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  //   throw new AppError(Status[404], "hi 4040");
  // const processedItems: TOrderItem[]=[]
  // let totalPrice
  for (const orderItem of payload.items) {
    const item = await ItemModel.findById(orderItem.item);
    if (!item) {
      throw new Error(`Item ${orderItem.item} not found`);
    }
    if (item.isDeleted) {
      throw new AppError(
        Status.BAD_REQUEST,
        `${item.title} is not available right now`
      );
    }
    if (item.quantity < orderItem.quantity) {
      throw new Error(`Insufficient stock for item ${item.title}`);
    }
    await ItemModel.findByIdAndUpdate(
      item._id,
      {
        $inc: { quantity: -orderItem.quantity },
      },
      { session }
    );
  }
  const transactionId = `ORDER-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  const order = new OrderModel({
    ...payload,
    user: user._id,
  });
  const paymentData: PaymentData = {
    transactionId: transactionId,
    orderId: order._id.toString(),
    totalPrice: payload.totalPrice,
    customerAddress: payload.shippingAddress.street,
    customerPhone: user.phoneNumber!,
    customerEmail: user.email!,
    callbackUrl: callback,
    custormerName: user.name!,
  };
  const paymentProcess = await initiatePayment(paymentData);
  order.transactionId = transactionId;
  await order.save({ session });
  await session.commitTransaction();
  session.endSession();
  return paymentProcess;
};

const getAllOrder = async () => {
  const result = await OrderModel.find()
    .populate({
      path: "user",
      select: "name email phoneNumber",
    })
    .populate({
      path: "items.item",
      populate: {
        path: "category",
        select: "name",
      },
    });
  return result;
};

const getOrderById = async (id: string) => {
  const result = await OrderModel.findById(id)
    .populate({
      path: "user",
      select: "name email phoneNumber",
    })
    .populate({
      path: "items.item",
      populate: {
        path: "category",
        select: "name",
      },
    });
  return result;
};

const getUsersOrder = async (userId: string) => {
  const result = await OrderModel.find({ user: userId }).populate({
    path: "items.item",
    populate: {
      path: "category",
      select: "name",
    },
  });
  return result;
};

const getUserOrderById = async (userId: string, id: string) => {
  const result = await OrderModel.find({ user: userId, _id: id }).populate({
    path: "items.item",
    populate: {
      path: "category",
      select: "name",
    },
  });
  return result;
};
const cancelOrder = async (id: string) => {
  const result = await OrderModel.findByIdAndUpdate(
    id,
    {
      status: "cancelled",
    },
    { new: true }
  );
  return result;
};
export const orderServices = {
  createOrder,
  getAllOrder,
  getOrderById,
  getUserOrderById,
  getUsersOrder,
  cancelOrder,
};
