import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();
router.post(
  "/create-user",
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser
);
router.get("/", auth(USER_ROLE.ADMIN), UserController.getUserAll);
router.get("/:id", auth(USER_ROLE.ADMIN), UserController.getUserById);
router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserController.updateUserById
);
router.delete("/:id", auth(USER_ROLE.ADMIN), UserController.userSoftDelete);
router.delete(
  "/delete/:id",
  auth(USER_ROLE.ADMIN),
  UserController.userHardDelete
);
export const userRoutes = router;
