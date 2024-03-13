import { Request, Response, NextFunction } from "express";
import productModel, { ProductDocument } from "../models/product.model";
import categoryModel from "../models/category.model";
import { CategoryDocument } from "./../models/category.model";
import { AuthRequest } from "../middleware/auth";

interface MulterFile {
    originalname: string;
}

const createProduct = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const { _id } = req.user;
    try {
        const productImages: MulterFile[] = (req.files as MulterFile[]) || [];
        const existingVendorProducts: ProductDocument | null =
            await productModel.findOne({ vendor: _id });

        const newProduct = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.categoryId,
            stock: req.body.stock,
            imagesUrl: productImages.map((file: MulterFile) => ({
                image: file.originalname,
            })),
        };

        if (existingVendorProducts) {
            existingVendorProducts.products.push(newProduct);
            await existingVendorProducts.save();
            res.status(201).json({
                message: "Product created successfully",
                success: true,
            });
        } else {
            const productData: ProductDocument = await productModel.create({
                vendor: _id,
                products: [newProduct],
            });

            res.status(201).json({
                message: "Product created successfully",
                product: productData,
            });
        }
    } catch (error) {
        return next(error);
    }
};

const createCategory = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const { _id } = req.user;

    try {
        const exits: CategoryDocument | null = await categoryModel.findOne({
            vendor: _id,
        });

        const newCategory = {
            name: req.body.name,
        };

        if (exits) {
            exits.category.push(newCategory);
            await exits.save();
            res.status(201).json({
                message: "category created successfully",
            });
        } else {
            const categoryData: CategoryDocument = await categoryModel.create({
                vendor: _id,
                category: [newCategory],
            });
            res.status(201).json({
                message: "category created successfully",
            });
        }

        return res.json({ message: "Category not created" });
    } catch (error) {
        return next(error);
    }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productModel
            .find({})
            .populate("vendor")
            .populate("products.category");

        return res.json({ product: products });
    } catch (error) {
        return next(error);
    }
};
const getCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await categoryModel
            .find({})
            .populate({
                path: "vendor",
                select: "-password -is_verify -roles -__v",
            })
            .select("-__v");
        res.json({ category: category });
    } catch (error) {
        return next(error);
    }
};

export const productController = {
    createProduct,
    createCategory,
    getProduct,
    getCategory,
};
