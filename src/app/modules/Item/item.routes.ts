import { Router } from "express";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { ImageFileZodSchema } from "../../zod/image.validation";
import { parseBody } from "../../middlewares/bodyParser";
import validateRequest from "../../middlewares/validateRequest";
import { ItemValidation } from "./item.validation";
import { itemController } from "./item.controller";
import { fileUploader } from "../../utils/fieUploader";

const router = Router();

router.post(
  "/",
  fileUploader.upload.single('file'),
  validateImageFileRequest(ImageFileZodSchema),
  parseBody,
  validateRequest(ItemValidation.createItemSchema),
  itemController.createItem
);

export const ItemRoutes = router
