import { Status } from "better-status-codes";
import AppError from "../../errors/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { itemServices } from "./item.service";
import sendResponse from "../../utils/sendResponse";

const createItem = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError(Status.BAD_REQUEST, "Please upload an image");
  }
  const result = await itemServices.createIItem(req.body, req.file);
  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item created successfully",
    data: result,
  });
});

export const itemController = {
  createItem,
};
