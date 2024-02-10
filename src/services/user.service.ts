import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import User, { UserDocument } from "../models/user.model";

// create user
async function createUser(
  input: Omit<UserDocument, "createdAt" | "updatedAt">
): Promise<UserDocument> {
  return User.create(input);
}

// find user
async function findUser(
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  return User.find(query, {}, options);
}

// find and update user
async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions
) {
  return User.findOneAndUpdate(query, options);
}

// delete user

async function deleteUser(query: FilterQuery<UserDocument>) {
  return User.deleteOne(query);
}

export const userServices = {
  createUser,
  findUser,
  findAndUpdateUser,
  deleteUser,
};
