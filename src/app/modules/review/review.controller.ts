import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TUser } from "../User/user.interface";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req, res) => {
  const result = await reviewService.createReview(req.body, req.user as TUser);
  sendResponse(res, {
    message: "Review added succesfully",
    success: true,
    statusCode: 200,
    data: result,
  });
});
const getReviewByProductid = catchAsync(async (req, res) => {
  const result = await reviewService.getReviwByProductId(req.params.id);
  sendResponse(res, {
    message: "Reviews retrived succesfully",
    success: true,
    statusCode: 200,
    data: result,
  });
});

export const reviewController = {
  createReview,
  getReviewByProductid,
};
