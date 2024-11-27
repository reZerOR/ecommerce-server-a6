import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();
router.post(
  "/",
  validateRequest(UserValidation.createUserValidationSchema),
  UserController.createUser
);
export const userRoutes = router 