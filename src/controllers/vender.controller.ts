import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import Joi from "joi";
import { venderService } from "../services/vender.service";

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
const venderLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
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
