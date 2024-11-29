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
const getAllItem = catchAsync(async (req, res) => {
  const result = await itemServices.getAllItem(req.query);
  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item retrived successfully",
    data: result,
  });
});
const getItemById = catchAsync(async (req, res) => {
  const result = await itemServices.getItemById(req.params.id as string);
  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item retrived successfully",
    data: result,
  });
});
const upadateItem = catchAsync(async (req, res) => {
  const result = await itemServices.updateItem(
    req.params.id as string,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item updated successfully",
    data: result,
  });
});
const deleteItem = catchAsync(async (req, res) => {
  const result = await itemServices.deleteItem(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item retrived successfully",
    data: result,
  });
});

export const itemController = {
  createItem,
  getAllItem,
  getItemById,
  upadateItem,
  deleteItem,
};
