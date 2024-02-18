import { Schema, model, Document } from "mongoose";

export interface VenderDocument extends Document {
  _id: number;
  username: string;
  password: string;
  is_verify: boolean;
  profile: string;
  email: string;
  roles: string;
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
    is_verify: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: String,
      default: "vender",
    },
    profile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<VenderDocument>("vender", venderSchema);
