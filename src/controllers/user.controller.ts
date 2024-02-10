import express, { Request, Response, NextFunction } from "express";

import {
  createUser,
  findAndUpdateUser,
  findUser,
  deleteUser,
} from "../services/user.service";

export const create_user = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json({ message: "empty body not allowed" });
  }
  try {
    const user = await createUser(req.body);

    if (user) {
      return res.json({ message: "success" });
    }
    return res.json({ message: "failed" });
  } catch (error) {
    return next(error);
  }
};
