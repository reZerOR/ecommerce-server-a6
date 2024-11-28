import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { categoryControllers } from "./category.controller";
import { CategoryValidation } from "./category.validation";
import { Router } from "express";

const router = Router();

router.get("/", categoryControllers.getAllCategory);

router.get("/:id", categoryControllers.getCategoryById);

router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createItemCategoryValidationSchema),
  categoryControllers.createCategory
);

router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateItemCategoryValidationSchema),
  categoryControllers.updateCategory
);

router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  categoryControllers.deleteCategory
);

export const CategoryRoutes = router;
