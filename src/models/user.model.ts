import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  isVerity: boolean;
  otp: string;
}

// user interface

interface User {
  _id: number;
  username: string;
  email: string;
  password: string;
  isVerity: boolean;
  otp: string;
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
      type: String,
    },
    roles: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export default model<User>("user", userSchema);
