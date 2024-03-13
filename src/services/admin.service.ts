import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import admin, { AdminDocument } from "../models/admin.model";

async function findAdmin(
    query: FilterQuery<AdminDocument>,
    options: QueryOptions = { lean: true },
) {
    return admin.findOne(query, {}, options);
}

async function updateAdmin(
    query: FilterQuery<AdminDocument>,
    update: UpdateQuery<AdminDocument>,
    options: QueryOptions,
) {
    return admin.findByIdAndUpdate(query, update, options);
}

async function findOneAdmin(
    query: FilterQuery<AdminDocument>,
    options: QueryOptions = { lean: true },
) {
    return admin.findOne(query, {}, options);
}

export const adminService = {
    findAdmin,
    findOneAdmin,
    updateAdmin,
};
