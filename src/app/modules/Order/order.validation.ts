import { z } from "zod";

export const orderValidationSchema = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          item: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid item ID"), // ObjectId format
          quantity: z.number().min(1, "Quantity must be at least 1"),
          price: z.number().min(0, "Price must be at least 0"),
        })
      )
      .min(1, "Order must contain at least one item"),
    totalPrice: z.number().min(0, "Total price must be at least 0"),
    status: z
      .enum(["pending", "processing", "completed", "cancelled"])
      .optional(), // Default is handled by the server
    transactionId: z.string().optional(),
    paymentStatus: z.enum(["unpaid", "paid", "failed"]).optional(), // Default is handled by the server
    shippingAddress: z.object({
      street: z.string().min(1, "Street is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zipCode: z.string().min(1, "Zip code is required"),
      country: z.string().min(1, "Country is required"),
    }),
    isDeleted: z.boolean().optional(), // Default is handled by the server
  }),
});

export const OrderValidation = {
  orderValidationSchema,
};
