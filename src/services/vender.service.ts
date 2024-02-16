import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import Vender, { VenderDocument } from "../models/vender.model";

async function createVender(
  input: Omit<VenderDocument, "createdAt" | "updatedAt">
): Promise<VenderDocument> {
  return Vender.create(input);
}

async function findVenderId(
  query: FilterQuery<VenderDocument>,
  options: QueryOptions = { lean: true }
) {
  return Vender.findOne(query, {}, options);
}

async function updateVender(
  query: FilterQuery<VenderDocument>,
  update: UpdateQuery<VenderDocument>,
  options: QueryOptions
) {
  return Vender.findByIdAndUpdate(query, update, options);
}

async function deleteVender(query: FilterQuery<VenderDocument>) {
  return Vender.deleteOne(query);
}

async function getVender(
  query: FilterQuery<VenderDocument>,
  options: QueryOptions = { lean: true }
) {
  return Vender.find(query, {}, options);
}

export const venderService = {
  createVender,
  findVenderId,
  updateVender,
  deleteVender,
  getVender,
};
