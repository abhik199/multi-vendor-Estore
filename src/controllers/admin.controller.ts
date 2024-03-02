import express, { Request, Response, NextFunction } from "express";
import { adminService } from "../services/admin.service";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateTokens from "../utils/generateToken.util";
import Joi from "joi";
import adminModel, { AdminDocument } from "../models/admin.model";

const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  const adminSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = adminSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const admin: AdminDocument | null = await adminModel.findOne({
      username: req.params.username,
    });
    if (!admin) {
      return res.json({ message: "wrong credentials" });
    }
    const pass: AdminDocument | null = await adminModel.findOne({
      password: req.body.password,
    });
    if (!pass) {
      return res.json({ message: "wrong credentials" });
    }
    const accessToken = await generateTokens({
      _id: admin._id,
      email: admin.username,
      roles: admin.roles,
    });
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return res.json({ message: "admin login successful" });
    return res;
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const profileSchema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = profileSchema.validate(req.params);
  if (error) {
    return next(error);
  }
  try {
    const check = await adminService.findOneAdmin({ _id: req.params.id });
    if (!check) {
      return res.json({ message: "admin not found" });
    }
    const admin: AdminDocument | null = await adminModel.findOne(
      { _id: req.params.id },
      { username: req.body.username, profile: req.body.profile }
    );
    if (admin) {
      return res.json({ message: "admin profile update" });
    }
  } catch (error) {
    return next(error);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const passwordSchema = Joi.object({
    email: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  });
  const { error } = passwordSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const admin = await adminService.findOneAdmin({ _id: req.params.id });
    if (admin) {
      const oldPassword = await bcrypt.compare(
        admin.password,
        req.body.oldPassword
      );
      if (!oldPassword) {
        return res.json({ message: "old password wrong" });
      }
      const newPassword = await bcrypt.hash(req.body.password, 10);
      if (newPassword) {
        return res.json({ message: "password successfully changes" });
      }
    }
  } catch (error) {
    return next(error);
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const forgotSchema = Joi.object({
    email: Joi.string().optional(),
  });
  const { error } = forgotSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const admin: AdminDocument | null = await adminModel.findOne({
      email: req.body.email,
    });
    if (!admin) {
      return res.json({ message: "email is wrong" });
    }
    const url = "";
  } catch (error) {
    return next(error);
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(error);
  }
};

export const adminController = {
  changePassword,
  updateProfile,
  adminLogin,
  resetPassword,
};
