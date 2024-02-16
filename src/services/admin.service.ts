import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import admin, { AdminDocument } from "../models/admin.model";

async function findAdmin(
  query: FilterQuery<AdminDocument>,
  options: QueryOptions = { lean: true }
) {
  return admin.findOne(query, {}, options);
}

export const adminService = {
  findAdmin,
};
