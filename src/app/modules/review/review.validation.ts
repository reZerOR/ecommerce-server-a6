import { z } from "zod";

const ReviewSchema = z.object({
  body: z.object({
    productId: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
      message: "Invalid ObjectId",
    }),
    message: z.string().min(1, "Message cannot be empty"),
    rating: z.number().min(1).max(5),
  }),
});

export const reviewValidation = {
  ReviewSchema,
};
