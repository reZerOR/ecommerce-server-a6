import { Router } from "express";
import { paymentController } from "./payment.controller";

const route = Router();

route.post("/confirmation", paymentController.confirmation);

export const paymentRoute = route;
