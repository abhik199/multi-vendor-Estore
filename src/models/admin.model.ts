import { Schema, Document, model } from "mongoose";

export interface AdminDocument extends Document {
  username: string;
  password: string;
  roles: string;
}

const adminSchema = new Schema<AdminDocument>({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  roles: {
    type: String,
    default: "admin",
  },
});

export default model<AdminDocument>("admin", adminSchema);
