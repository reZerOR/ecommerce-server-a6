import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validation";

const router = Router();
router.post(
  "/",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  validateRequest(OrderValidation.orderValidationSchema),
  orderController.createOrder
);
router.get("/", auth(USER_ROLE.ADMIN), orderController.getAllOrder);
router.get("/user/:id", auth(USER_ROLE.ADMIN, USER_ROLE.USER), orderController.getOrderById);
router.get(
  "/user",
  auth(USER_ROLE.ADMIN, USER_ROLE.USER),
  orderController.getUsersOrder
);
router.get("/:id", auth(USER_ROLE.ADMIN), orderController.getUserOrderById);
router.delete("/:id", auth(USER_ROLE.ADMIN), orderController.cancelOrder);
router.put("/:id", auth(USER_ROLE.ADMIN), orderController.updateOrder);
export const orderRoutes = router;
