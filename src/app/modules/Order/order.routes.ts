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
router.get("/", auth(USER_ROLE.ADMIN), orderController.getAllOrder);
router.get("/:id", auth(USER_ROLE.ADMIN), orderController.getOrderById);
router.get(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  orderController.getUsersOrder
);
router.get("/:id", auth(USER_ROLE.ADMIN), orderController.getUserOrderById);
router.delete("/:id", auth(USER_ROLE.ADMIN), orderController.cancelOrder);
export const orderRoutes = router;
