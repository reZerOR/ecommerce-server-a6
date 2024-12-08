import { Status } from "better-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";
import { TUser } from "../User/user.interface";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderServices.createOrder(
    req.body,
    req.user as Partial<TUser>,
    req.headers.origin as string
  );
  sendResponse(res, {
    success: true,
    statusCode: Status[200],
    message: "Order created successfully",
    data: result,
  });
});
const getAllOrder = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrder();
  sendResponse(res, {
    success: true,
    statusCode: Status[200],
    message: "Order retrived successfully",
    data: result,
  });
});
const getOrderById = catchAsync(async (req, res) => {
  const result = await orderServices.getOrderById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: Status[200],
    message: "Order retrived successfully",
    data: result,
  });
});
const getUsersOrder = catchAsync(async (req, res) => {
  const result = await orderServices.getUsersOrder(req.user._id);
  sendResponse(res, {
    success: true,
    statusCode: Status[200],
    message: "Order retrived successfully",
    data: result,
  });
});
const getUserOrderById = catchAsync(async (req, res) => {
  const result = await orderServices.getUserOrderById(
    req.user.id,
    req.params.id
  );
  sendResponse(res, {
    success: true,
    statusCode: Status[200],
    message: "Order retrived successfully",
    data: result,
  });
});
const cancelOrder = catchAsync(async (req, res) => {
  const result = await orderServices.cancelOrder(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: Status[200],
    message: "Order Canceled successfuly",
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrder,
  getOrderById,
  getUserOrderById,
  getUsersOrder,
  cancelOrder,
};
