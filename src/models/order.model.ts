// order.model.ts

import mongoose, { Schema, Document } from "mongoose";
export interface OrderDocument extends Document {
  user: string;
  products: Array<{ product: string; quantity: number }>;
  totalAmount: number;
  orderStatus: string;
}

const orderSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["Pending", "Dispatched", "Delivered", "Canceled"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<OrderDocument>("Order", orderSchema);
