import { Router } from "express";
import { parseBody } from "../../middlewares/bodyParser";
import validateRequest from "../../middlewares/validateRequest";
import { ItemValidation } from "./item.validation";
import { itemController } from "./item.controller";
import { fileUploader } from "../../utils/fieUploader";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  fileUploader.upload.single("file"),
  parseBody,
  validateRequest(ItemValidation.createItemSchema),
  itemController.createItem
);
router.get("/", itemController.getAllItem);
router.get("/:id", itemController.getItemById);
router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  fileUploader.upload.single("file"),
  parseBody,
  validateRequest(ItemValidation.updateItemSchema),
  itemController.upadateItem
);
router.delete("/:id", auth(USER_ROLE.ADMIN), itemController.deleteItem);

export const ItemRoutes = router;
