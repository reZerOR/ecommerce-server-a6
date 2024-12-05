import { TImageFile } from "../../interfaces/image.interface";
import { TItem } from "./item.interface";
import { fileUploader } from "../../utils/fieUploader";
import ItemModel from "./item.model";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { ItemsSearchableFields } from "./item.constant";
import { CategoryModel } from "../Category/categpry.model";
import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Status } from "better-status-codes";

const createIItem = async (payload: TItem, image: TImageFile) => {
  if (!image) {
    throw new AppError(Status.BAD_REQUEST, "Image is not provided");
  }
  const uploadToCloudinary = await fileUploader.uploadToCloudinary(image);
  payload.image = uploadToCloudinary?.secure_url;
  const result = await ItemModel.create(payload);
  return result;
};
const getAllItem = async (query: Record<string, unknown>) => {
  // const result = await ItemModel.find().populate("category");

  if (
    query.category &&
    typeof query.category === "string" &&
    !mongoose.isValidObjectId(query.category)
  ) {
    const category = await CategoryModel.findOne({
      name: query.category,
    });

    if (category) {
      query.category = category._id;
    } else {
      // If category not found, set an impossible ObjectId to ensure empty results
      query.category = "000000000000000000000000";
    }
  }

  const itemQuery = new QueryBuilder(
    ItemModel.find({ isDeleted: false }).populate("category"),
    query
  )
    .filter()
    .search(ItemsSearchableFields)
    .sort()
    .paginate()
    .fields();

  const result = await itemQuery.modelQuery;
  const total = await ItemModel.countDocuments(
    itemQuery.modelQuery.getFilter()
  );
  return {
    meta: {
      total,
      page: result.length > 0 ? Number(query.page || 1) : 0,
      limit: result.length > 0 ? Number(query.limit || 10) : 0,
    },
    items: result,
  };
};

const getItemById = async (id: string) => {
  const result = await ItemModel.findOne({ _id: id, isDeleted: false });
  return result;
};
const updateItem = async (id: string, payload: TItem, image: TImageFile) => {
  const isCategoryExists = await CategoryModel.findOne({
    _id: payload.category,
    isDeleted: false,
  });
  if (!isCategoryExists) {
    throw new AppError(Status.NOT_FOUND, "Category not found");
  }
  if (image) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(image);
    payload.image = uploadToCloudinary?.secure_url;
  }
  const result = await ItemModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteItem = async (id: string) => {
  const result = await ItemModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};
export const itemServices = {
  createIItem,
  getAllItem,
  getItemById,
  updateItem,
  deleteItem,
};
