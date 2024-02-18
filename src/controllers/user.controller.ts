import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { userServices } from "../services/user.service";
import emailService, { emailKey } from "../services/email.service";
import generateTokens from "../utils/generateToken.util";

// generate 6 digit otp
const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};

const create_user = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ message: "empty body not allowed" });
  }
  try {
    const check = await userServices.findOne({ email: req.body.email });
    if (check) {
      return res.json({ message: "user already exists" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const OTP = generateOtp();
    const user = await userServices.createUser({
      ...req.body,
      password: hashPassword,
      otp: OTP,
    });

    // email service
    const emailData: emailKey = {
      email: user.email,
      name: user.username,
      otp: OTP,
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
  if (!req.body.email || !req.body.password) {
    return res.json({ message: "Incorrect email and password" });
  }
  try {
    const user = await userServices.findOne({ email: req.body.email });
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
  if (!req.body.email || !req.body.otp) {
    return res.json({ message: "user email and otp required " });
  }
  try {
    const user = await userServices.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ message: "not a valid email" });
    }
    console.log(user.otp);

    if (user.otp === req.body.otp) {
      const update = await userServices.findAndUpdateUser(
        { email: req.body.email },
        { isVerity: true, otp: null },
        { new: true }
      );
      if (update) {
        return res.json({ message: "user verified successfully" });
      }
    } else {
      return res.json({ message: "otp expired and wrong" });
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
    const user = await userServices.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ message: "user is not found" });
    }
    if (user.isVerity === false) {
      const OTP = generateOtp();
      const newOTP = await userServices.findAndUpdateUser(
        { email: req.body.email },
        { otp: OTP },
        { new: true }
      );
      const emailData: emailKey = {
        email: user.email,
        name: user.username,
        otp: OTP,
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

export const userController = {
  create_user,
  changePassword,
  userLogin,
  forgotPassword,
  updateUser,
  verifyUser,
  reVerify,
};
