import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

import Order, { OrderDocument } from "../models/order.model";

async function createOrder(
    input: Omit<OrderDocument, "createdAt" | "updatedAt">,
): Promise<OrderDocument> {
    return Order.create(input);
}

async function getAllOrder(
    query: FilterQuery<OrderDocument>,
    options: QueryOptions = { lean: true },
) {
    return Order.find(query, {}, options);
}

async function getOneOrder(
    query: FilterQuery<OrderDocument>,
    options: QueryOptions = { lean: true },
) {
    return Order.findOne(query, {}, options);
}

async function updateOrder(
    query: FilterQuery<OrderDocument>,
    update: UpdateQuery<OrderDocument>,
    options: QueryOptions,
) {
    return Order.findByIdAndUpdate(query, update, options);
}
async function deleteOrder(query: FilterQuery<OrderDocument>) {
    return Order.deleteOne(query);
}

export const orderService = {
    createOrder,
    getAllOrder,
    getOneOrder,
    updateOrder,
    deleteOrder,
};
