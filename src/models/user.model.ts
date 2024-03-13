import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    isVerity: boolean;
    otp: number;
}

// user interface

interface User {
    _id: number;
    username: string;
    email: string;
    password: string;
    isVerity: boolean;
    otp: number;
    roles: string;
}

const userSchema = new Schema<User>(
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
        isVerity: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Number,
        },
        roles: {
            type: String,
            default: "user",
        },
    },
    { timestamps: true },
);

export default model<User>("user", userSchema);
