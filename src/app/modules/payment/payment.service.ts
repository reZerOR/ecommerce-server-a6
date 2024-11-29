import ItemModel from "../Item/item.model";
import OrderModel from "../Order/order.model";
import { verifyPayment } from "./payment.utils";
const restoreItemQuantities = async (orderId: string) => {
  const order = await OrderModel.findById(orderId);

  if (!order) return;

  for (const orderItem of order.items) {
    await ItemModel.findByIdAndUpdate(orderItem.item, {
      $inc: { quantity: orderItem.quantity },
    });
  }
};

const deleteBooking = async (orderId: string) => {
  await restoreItemQuantities(orderId);
  await OrderModel.findByIdAndUpdate(orderId, {
    status: "cancelled",
    paymentStatus: "failed",
  });
};

const confirmationService = async (
  transactionId: string,
  orderId: string,
  status: string
) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result = {};
  let message = "";
  if (status === "success") {
    if (verifyResponse && verifyResponse.pay_status === "Successful") {
      result =
        (await OrderModel.findByIdAndUpdate(
          orderId,
          {
            status: "processing",
            paymentStatus: "paid",
          },
          { new: true }
        )) || {};
      message = "Successfully Paid!";
    } else {
      message = "Payment Failed!";
      await deleteBooking(orderId);
    }
  } else {
    message = "Payment Canceled!";
    await deleteBooking(orderId);
  }

  return { result, message };
};

export const paymentServices = {
  confirmationService,
};
