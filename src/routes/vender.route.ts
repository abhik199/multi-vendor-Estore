import { Router } from "express";
import { venderController } from "../controllers/vender.controller";
import { productController } from "../controllers/product.controller";
import { upload } from "../services/img.service";

const venderRoute = Router();

venderRoute.post("/login", venderController.venderLogin);
venderRoute.post("/register", venderController.createVender);
venderRoute.patch("/update", venderController.updateVender);

// product

venderRoute.post(
  "/product",
  upload.array("product-image", 5),
  productController.createProduct
);
venderRoute.post("/category", productController.createCategory);

venderRoute.get("/product", productController.getProduct);

export default venderRoute;
