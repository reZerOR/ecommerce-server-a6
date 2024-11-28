import { TImageFile } from "../../interfaces/image.interface";
import { TItem } from "./item.interface";

const createIItem = async (payload: TItem, image: TImageFile) => {
  console.log(payload);
  console.log(image);

  return "";
};
export const itemServices = {
    createIItem
}
