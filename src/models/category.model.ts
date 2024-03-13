import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document {
    vendor: Schema.Types.ObjectId;
    category: Array<{ name: string }>;
}

const categorySchema = new Schema<CategoryDocument>(
    {
        vendor: {
            type: Schema.Types.ObjectId,
            ref: "vendor",
            required: true,
        },
        category: [
            {
                name: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true },
);

export default model<CategoryDocument>("category", categorySchema);
