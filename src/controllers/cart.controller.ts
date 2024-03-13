import Joi from "joi";
import { AuthRequest } from "../middleware/auth";
import cartModel, { CartDocument } from "../models/cart.model";
import { Request, Response, NextFunction } from "express";

export const createCart = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const { _id } = req.user;
    const cartSchema = Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().required(),
    });
    const { error } = cartSchema.validate(req.body);
    if (error) {
        return next(error);
    }
    try {
        const existCart: CartDocument | null = await cartModel.findOne({
            user: _id,
        });
        const newCart = {
            product: req.body.product,
            quantity: req.body.quantity,
        };

        if (existCart) {
            existCart.carts.push(newCart);
            await existCart.save();
            res.status(201).json({
                message: "order placed successfully",
                success: true,
            });
        } else {
            const cart: CartDocument | null = await cartModel.create({
                user: _id,
                carts: [newCart],
            });
            res.status(201).json({
                message: "order placed successfully",
                success: true,
            });
        }
    } catch (error) {
        return next(error);
    }
};

export const deleteCart = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { id } = req.params;
        const deletedCart = await cartModel.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(204).end();
    } catch (error) {
        return next(error);
    }
};

export const getCart = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { _id } = req.user;
        const cart = await cartModel.find({});
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ cart });
    } catch (error) {
        return next(error);
    }
};

export const cartController = {
    getCart,
    deleteCart,
    createCart,
};
