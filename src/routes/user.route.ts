import { Router } from "express";
import { userController } from "../controllers/user.controller";

const userRoute = Router();

userRoute.post("/register", userController.create_user);
userRoute.post("/login", userController.userLogin);
userRoute.post("forgot_password");
userRoute.post("/change_password", userController.changePassword);
userRoute.post("/verify_otp", userController.verifyUser);
userRoute.post("/resend_email", userController.reVerify);

export default userRoute;
