import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";

import Product, { ProductDocument } from "../models/product.model";

async function createProduct(
  input: Omit<ProductDocument, "createdAt" | "updatedAt">
): Promise<ProductDocument> {
  return Product.create(input);
}

async function AllProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return Product.find(query, {}, options);
}

async function byIdProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  return Product.findOne(query, {}, options);
}

async function updateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return Product.findByIdAndUpdate(query, update, options);
}

async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return Product.deleteOne(query);
}

export const productService = {
  deleteProduct,
  updateProduct,
  AllProduct,
  byIdProduct,
  createProduct,
};
