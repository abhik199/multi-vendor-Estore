import express, { Request, Response, NextFunction } from "express";
import { adminService } from "../services/admin.service";
import bcrypt from "bcrypt";
import crypto from "crypto";
import generateTokens from "../utils/generateToken.util";

const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admin = await adminService.findAdmin({
      username: req.params.username,
    });
    if (!admin) {
      return res.json({ message: "wrong credentials" });
    }
    const pass = await adminService.findAdmin({ password: req.body.password });
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

export const adminController = {
  adminLogin,
};
