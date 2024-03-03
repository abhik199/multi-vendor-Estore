import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import emailService, { emailKey } from "../services/email.service";
import generateTokens from "../utils/generateToken.util";
import Joi from "joi";
import userModel, { UserDocument } from "./../models/user.model";
import { AuthRequest } from "../middleware/auth";

// generate 6 digit otp
const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};

const create_user = async (req: Request, res: Response, next: NextFunction) => {
  const userSchema = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const check: UserDocument | null = await userModel.findOne({
      email: req.body.email,
    });
    if (check) {
      return res.json({ message: "user already exists" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const OTP = generateOtp();
    const user = await userModel.create({
      ...req.body,
      password: hashPassword,
      otp: OTP,
    });

    // email service
    const emailData: emailKey = {
      email: user.email,
      name: user.username,
      otp: OTP,
      paths: "../views/otp.ejs",
    };
    const info = await emailService(emailData);

    if (user) {
      return res.json({ message: "success", info });
    }

    return res.json({ message: "failed" });
  } catch (error) {
    return next(error);
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  // if (!req.body.email || !req.body.password) {
  //   return res.json({ message: "Incorrect email and password" });
  // }
  const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const user: UserDocument | null = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.json({ message: "email and password wrong" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.json({ message: "Incorrect email and password" });
    }

    // when user all credentials are valid
    const accessToken = await generateTokens({
      _id: user._id,
      email: req.body.email,
      roles: req.body.roles,
    });
    res.cookie("token", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    if (accessToken) {
      return res.json({ message: "user login successfully", accessToken });
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

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate request body
    const userSchema = Joi.object({
      email: Joi.string().required(),
      otp: Joi.number().required(),
    });
    const { error } = userSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const user: UserDocument | null = await userModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.otp === user.otp) {
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { otp: null, isVerity: true },
        { new: true }
      );
      res.json({
        message: "OTP verified and updated successfully",
        user: updatedUser,
      });

      return res.json({ message: "OTP verified successfully" });
    } else {
      if (user.isVerity === true) {
        return res.status(400).json({ message: "user already verify" });
      }
      return res.status(400).json({ message: "Incorrect OTP" });
    }
  } catch (error) {
    return next(error);
  }
};
const reVerify = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email) {
    return res.json({ message: "missing email" });
  }
  try {
    const user: UserDocument | null = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.json({ message: "user is not found" });
    }
    if (user.isVerity === false) {
      const OTP = generateOtp();
      const newOTP: UserDocument | null = await userModel.findByIdAndUpdate(
        { email: req.body.email },
        { otp: OTP },
        { new: true }
      );
      const emailData: emailKey = {
        email: user.email,
        name: user.username,
        otp: OTP,
        paths: "../views/otp.ejs",
      };
      const info = await emailService(emailData);
      if (newOTP) {
        return res.json({ message: "success", info });
      }
    } else {
      return res.json({ message: "user already verified" });
    }
  } catch (error) {
    return next(error);
  }
};

const logOutUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    return next(error);
  }
};
const resetPassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const createAddress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const deleteAddress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const editAddress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const fetchAddress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
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
  verifyUser,
  reVerify,
  logOutUser,
  resetPassword,
  createAddress,
  deleteAddress,
  fetchAddress,
  editAddress,
};
