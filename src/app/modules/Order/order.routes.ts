import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  orderController.createOrder
);
export const orderRoutes = router;
