import { Status } from "better-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const itemCategory = await categoryServices.createCategory(req.body);

  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item Category Created Successfully",
    data: itemCategory,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const itemCategory = await categoryServices.getAllCategory();

  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item Category Retrieved Successfully",
    data: itemCategory,
  });
});

const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await categoryServices.getCategoryByid(id);

  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item Category Retrieved Successfully",
    data: itemCategory,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await categoryServices.updateCategory(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item Category updated successfully",
    data: itemCategory,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const itemCategory = await categoryServices.deleteCategory(id);

  sendResponse(res, {
    success: true,
    statusCode: Status.OK,
    message: "Item Category Deleted Successfully",
    data: itemCategory,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
