import { Request, Response, NextFunction } from "express";
import Joi from "joi";
const DEBUG_MODE = true;

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let data = {
    message: "Internal server error",
    ...(DEBUG_MODE === true && { originError: error.message }),
  };
  if (error instanceof Joi.ValidationError) {
    statusCode = 422;
    data = {
      message: error.message,
    };
  }
  return res.status(statusCode).json(data);
}

export default errorHandler;
