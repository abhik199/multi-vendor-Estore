import { Schema, model, Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
}

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    stock: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<ProductDocument>("product", productSchema);
