import { Request, Response, NextFunction } from "express";
import orderModel, { OrderDocument } from "../models/order.model";
import { AuthRequest } from "../middleware/auth";
import Joi from "joi";

const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;

  const orderSchema = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
  });
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return;
  }
  try {
  } catch (error) {
    return next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    return next(error);
  }
};

export const orderController = {
  createOrder,
  deleteOrder,
  updateOrder,
};
