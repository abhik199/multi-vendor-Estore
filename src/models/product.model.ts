import { Schema, model, Document } from "mongoose";

export interface ProductDocument extends Document {
  vendor: Schema.Types.ObjectId;
  products: Array<{
    name: string;
    price: number;
    description: string;
    category: Schema.Types.ObjectId;
    stock: number;
    imagesUrl: Array<{ image: string }>;
  }>;
}

const productSchema: Schema = new Schema(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
    },
    products: [
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
          type: Schema.Types.ObjectId,
          ref: "Category",
        },
        stock: {
          type: Number,
        },
        imagesUrl: [
          {
            image: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default model<ProductDocument>("product", productSchema);
