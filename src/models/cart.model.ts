import mongoose, { Schema, Document } from "mongoose";

export interface CartDocument extends Document {
  user: string;
  carts: Array<{
    product: string;
    quantity: number;
  }>;
  subtotal: string;
}

const cartSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    carts: [
      {
        product: {
          type: String,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    subtotal: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CartDocument>("cart", cartSchema);
