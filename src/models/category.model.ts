import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
}
export interface Category {
  name: string;
}

const categorySchema = new Schema<Category>(
  {
    name: {
      type: "string",
    },
  },
  { timestamps: true }
);

export default model<Category>("Category", categorySchema);
