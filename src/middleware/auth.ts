import venderModel from "../models/vender.model";
import { verify } from "../services/jwt.service";

import { Request, Response, NextFunction } from "express";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not found");
    }
    const data = await verify(token);

    if (!data) {
      throw new Error("Invalid token");
    }
    req.user = data;
    next();
  } catch (error) {
    next(error);
  }
};

export const vendor_auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    const vendorFind = await venderModel.findOne({ is_verify: true });

    if (!vendorFind) {
      return res.status(401).json({
        status: false,
        message: "No verified vendor found.",
      });
    }

    if (vendorFind.roles === "vendor") {
      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "You are not authorized to access this resource.",
      });
    }
  } catch (error) {
    return next(error);
  }
};
