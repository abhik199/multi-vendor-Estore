import { Schema, model, Document } from "mongoose";

export interface VenderDocument extends Document {
    _id: number;
    username: string;
    password: string;
    isVerify: boolean;
    profile: string;
    email: string;
    roles: string;
    company: string;
}

const venderSchema = new Schema<VenderDocument>(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        isVerify: {
            type: Boolean,
            default: false,
        },
        company: {
            type: String,
        },
        roles: {
            type: String,
            default: "vendor",
        },
        profile: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export default model<VenderDocument>("vendor", venderSchema);
