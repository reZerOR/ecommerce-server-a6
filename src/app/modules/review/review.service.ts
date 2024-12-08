import { Status } from "better-status-codes";
import AppError from "../../errors/AppError";
import OrderModel from "../Order/order.model";
import { TUser } from "../User/user.interface";
import { TReview } from "./review.interface";
import ReviewModel from "./review.model";

const createReview = async (payload: TReview, user: TUser) => {
  const isUserHasOrder = await OrderModel.findOne({
    user: user._id,
    "items.item": payload.productId,
    isDeleted: false,
  });
  if (!isUserHasOrder) {
    throw new AppError(Status.BAD_REQUEST, "You cant review this product");
  }
  payload.urerId = user._id;
  const result = await ReviewModel.create(payload);
  return result;
};
const getReviwByProductId = async (productId: string) => {
  const result = await ReviewModel.find({
    productId: productId,
  });
  return result;
};
export const reviewService = {
  createReview,
  getReviwByProductId,
};
