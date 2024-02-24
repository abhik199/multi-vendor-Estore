import { orderService } from "../services/order.service";
import { Request, Response, NextFunction } from "express";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
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
