import { Router } from "express";
import { venderController } from "../controllers/vender.controller";
import { productController } from "../controllers/product.controller";
import { upload } from "../services/img.service";
import { auth, vendor_auth } from "../middleware/auth";

const venderRoute = Router();

venderRoute.post("/login", venderController.venderLogin);
venderRoute.post("/register", venderController.createVender);
venderRoute.patch("/update", venderController.updateVender);
venderRoute.post("/forgot_password", venderController.forgotPassword);
venderRoute.get("/reset_password", venderController.resetPassword);
venderRoute.post(
    "/change_password",
    [auth, vendor_auth],
    venderController.changePassword,
);

// product

venderRoute.post(
    "/product",
    [auth, vendor_auth],
    upload.array("product-image", 5),
    productController.createProduct,
);
venderRoute.post(
    "/category",
    [auth, vendor_auth],
    productController.createCategory,
);

venderRoute.get("/product", productController.getProduct);
venderRoute.get("/category", productController.getCategory);

export default venderRoute;
