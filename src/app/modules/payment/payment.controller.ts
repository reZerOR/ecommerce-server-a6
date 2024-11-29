import { catchAsync } from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const confirmation = catchAsync(async (req, res) => {
  await paymentServices.confirmationService(
    req.query.transactionId as string,
    req.query.orderId as string,
    req.query.status as string
  );
  // console.log('2');
  res.redirect(req.query.callbackUrl as string);
});

export const paymentController = {
  confirmation,
};
