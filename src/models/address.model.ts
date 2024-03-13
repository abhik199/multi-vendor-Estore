import mongoose, { Schema, Document } from "mongoose";

export interface Address extends Document {
    user: Schema.Types.ObjectId;
    address: Array<{
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    }>;
}

const addressSchema: Schema<Address> = new Schema<Address>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: [
        {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
    ],
});

const AddressModel = mongoose.model<Address>("Address", addressSchema);

export default AddressModel;
