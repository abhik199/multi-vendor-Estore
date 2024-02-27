import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import generateTokens from "../utils/generateToken.util";
import Vender, { VenderDocument } from "../models/vender.model";
import emailService, { emailKey } from "../services/email.service";
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
    const check = await Vender.findOne({
      email: req.body.email,
    });
    if (check) {
      return res.json({ message: "vender already exists" });
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const vendor: VenderDocument = await Vender.create({
      ...req.body,
      password: hashPassword,
    });
    if (vendor) {
      return res.status(201).json({ message: "vendor created successfully" });
    }
    return res.json({ message: "Failed to create" });
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
    const vendor: VenderDocument | null = await Vender.findOne({
      email: req.body.email,
    });
    if (!vendor) {
      return res.json({ message: "Incorrect email", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, vendor.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password", success: false });
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
const updateVender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    return res.json({ message: "Vendor id required" });
  }
  try {
    const vendor: VenderDocument | null = await Vender.findByIdAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        profile: "687adf7",
        company: req.body.company,
      },
      {
        new: true,
      }
    );
    if (!vendor) {
      return res.json({ message: "Vendor not found", success: false });
    }
    return res.json({
      message: "Vendor updated successfully",
      success: true,
    });
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
    email: Joi.string().email().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  });
  const { error } = passwordSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const vendor: VenderDocument | null = await Vender.findOne({
      email: req.body.email,
    });
    if (!vendor) {
      return res.json({ message: "email is wrong" });
    }
    const isMatch = await bcrypt.compare(req.body.oldPassword, vendor.password);
    if (!isMatch) {
      return res.json({ message: "Old password is not match" });
    }
    const hashPassword = await bcrypt.hash(req.body.newPassword, 10);
    const update: VenderDocument | null = await Vender.findByIdAndUpdate(
      { email: req.body.email },
      { password: hashPassword }
    );
    if (update) {
      return res.json({ message: "Password update successfully" });
    }
    return res.json({ message: "Update failed" });
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
    email: Joi.string().email(),
  });
  const { error } = forgotSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const vendor: VenderDocument | null = await Vender.findOne({
      email: req.body.email,
    });
    if (!vendor) {
      return res.json({ message: "vendor id not find" });
    }
    const emailData: emailKey = {
      email: vendor.email,
      name: vendor.username,
      // otp: OTP,
      paths: "../views/forgot.ejs",
    };
    const info = await emailService(emailData);
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

export const venderController = {
  createVender,
  venderLogin,
  updateVender,
  changePassword,
  forgotPassword,
  resetPassword,
};
