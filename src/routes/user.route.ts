import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { auth } from "../middleware/auth";
import { orderController } from "../controllers/order.controller";
import { productController } from "../controllers/product.controller";
import { cartController } from "../controllers/cart.controller";

const userRoute = Router();

// auth routes
userRoute.post("/register", userController.create_user);
userRoute.post("/login", userController.userLogin);
userRoute.post("forgot_password", userController.forgotPassword);
userRoute.post("/change_password", auth, userController.changePassword);
userRoute.post("/verify_otp", userController.verifyUser);
userRoute.post("/resend_email", userController.reVerify);
userRoute.get("/logout", auth, userController.logOutUser);
userRoute.get("/reset_password", userController.resetPassword);

// user address routes

userRoute.post("/address", auth, userController.createAddress);
userRoute.get("/address", auth, userController.fetchAddress);
userRoute.patch("/address/:id", auth, userController.editAddress);
userRoute.delete("/address/:id", auth, userController.deleteAddress);

// category routes
userRoute.get("/category");

userRoute.get("/products", productController.getProduct);

// order routes
userRoute.post("/create_order", auth, orderController.createOrder);

// cart routes
userRoute.post("/add_cart", auth, cartController.createCart);
userRoute.get("/get_cart", auth, cartController.getCart);
userRoute.delete("/remove_cart", auth, cartController.deleteCart);

userRoute.get("/order");

export default userRoute;
