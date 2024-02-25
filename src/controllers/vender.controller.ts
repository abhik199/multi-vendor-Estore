import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Joi from "joi";
import { venderService } from "../services/vender.service";
import venderModel from "../models/vender.model";
import generateTokens from "../utils/generateToken.util";

const createVender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const venderSchema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = venderSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const check = await venderService.findOneVender({ email: req.body.email });
    if (check) {
      return res.json({ message: "vender already exists" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const vender = await venderService.createVender({
      ...req.body,
      password: hashPassword,
    });
    if (vender) {
      return res.json({ message: "vender create successfully " });
    }
  } catch (error) {
    return next(error);
  }
};
const venderLogin = async (req: Request, res: Response, next: NextFunction) => {
  const vendorSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = vendorSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const vendor = await venderModel.findOne({ email: req.body.email });
    if (!vendor) {
      return res.json({ message: "Incorrect credentials", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, vendor.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect credentials", success: false });
    }

    const accessToken = await generateTokens({
      _id: vendor._id,
      email: vendor.email,
      roles: vendor.roles,
    });
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    if (accessToken) {
      return res.json({ message: "user login successfully" });
    }
  } catch (error) {
    return next(error);
  }
};
const updateVender = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return next(error);
  }
};
const changePassword = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return next(error);
  }
};

export const venderController = {
  createVender,
  venderLogin,
  updateVender,
  changePassword,
};
