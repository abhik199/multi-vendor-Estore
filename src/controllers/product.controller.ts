import { Request, Response, NextFunction } from "express";
import { productService } from "../services/product.service";
import { venderService } from "./../services/vender.service";
import productModel, { ProductDocument } from "../models/product.model";
import { Multer } from "multer";
import categoryModel from "../models/category.model";

interface MulterFile {
  originalname: string;
}

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const check = await venderService.findOneVender({ is_verify: true });
    // if (!check) {
    //   return res.status(400).json({ message: "vendor is not verify" });
    // }

    const productImages: MulterFile[] = (req.files as MulterFile[]) || [];
    const existingVendorProducts: ProductDocument | null =
      await productModel.findOne({ vendor: req.body.vendorId });

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
        vendor: req.body.vendorId,
        products: [newProduct],
      });
      //   await productData.save();
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryModel.create({
      name: req.body.name,
    });
    if (category) {
      return res.json({
        message: "Category created successfully",
      });
    }
    return res.json({ message: "Category not created" });
  } catch (error) {
    return next(error);
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products: ProductDocument[] = await productModel
      .find({})
      .populate("Category")
      .exec();

    return res.json({ product: products });
  } catch (error) {
    return next(error);
  }
};

export const productController = {
  createProduct,
  createCategory,
  getProduct,
};
