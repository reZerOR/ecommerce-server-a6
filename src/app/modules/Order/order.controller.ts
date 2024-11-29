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

export const orderController = {
  createOrder,
};
