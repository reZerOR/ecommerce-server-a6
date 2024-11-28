import { Status } from "better-status-codes";
import { TCategory } from "./category.interface";
import { CategoryModel } from "./categpry.model";
import AppError from "../../errors/AppError";

const createCategory = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);
  return result;
};

const getAllCategory = async () => {
  const result = await CategoryModel.find();
  return result;
};

const getCategoryByid = async (id: string) => {
  const isCategoryExists = await CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!isCategoryExists) {
    throw new AppError(Status.NOT_FOUND, "Item Category not found!");
  }

  const category = await CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  }).exec();
  return category;
};

const updateCategory = async (id: string, payload: Partial<TCategory>) => {
  const isCategoryExists = await CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!isCategoryExists) {
    throw new AppError(Status.NOT_FOUND, "Item Category not found!");
  }

  const category = await CategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return category;
};
const deleteCategory = async (id: string) => {
  const isCategoryExists = await CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!isCategoryExists) {
    throw new AppError(Status.NOT_FOUND, "Item Category not found!");
  }

  const category = await CategoryModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return category;
};

export const categoryServices = {
  createCategory,
  getAllCategory,
  getCategoryByid,
  updateCategory,
  deleteCategory,
};
