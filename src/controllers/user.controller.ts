import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { userServices } from "../services/user.service";

const create_user = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ message: "empty body not allowed" });
  }
  try {
    const user = await userServices.createUser(req.body);

    if (user) {
      return res.json({ message: "success" });
    }
    return res.json({ message: "failed" });
  } catch (error) {
    return next(error);
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {};
const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) {
    return res.json({ message: "user id required" });
  }
  try {
    // const update_user = await userServices.findAndUpdateUser(req.params.id, {
    //   username: req.body.username,
    // },{new:true});
  } catch (error) {
    return next(error);
  }
};

export const userController = {
  create_user,
  changePassword,
  userLogin,
  forgotPassword,
  updateUser,
};
