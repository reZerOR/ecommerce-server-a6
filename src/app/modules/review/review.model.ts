// models/review.model.ts

import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema<TReview>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    message: { type: String, required: true, trim: true },
    urerId: {
      type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const ReviewModel = model<TReview>("Review", ReviewSchema);

export default ReviewModel;
