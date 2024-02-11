// order.model.ts

import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Order document
interface IOrder extends Document {
  user: string;
  products: Array<{ product: string; quantity: number }>;
  totalAmount: number;
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
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);
