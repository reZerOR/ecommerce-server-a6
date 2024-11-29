import { TImageFile } from "../../interfaces/image.interface";
import { TItem } from "./item.interface";
import { fileUploader } from "../../utils/fieUploader";
import ItemModel from "./item.model";

const createIItem = async (payload: TItem, image: TImageFile) => {
  const uploadToCloudinary = await fileUploader.uploadToCloudinary(image);
  payload.image = uploadToCloudinary?.secure_url;
  const result = await ItemModel.create(payload);
  return result;
};
export const itemServices = {
  createIItem,
};
