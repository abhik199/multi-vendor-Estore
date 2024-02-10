import { Router } from "express";
import { userController } from "../controllers/user.controller";

const userRoute = Router();

userRoute.post("/register", userController.create_user);
userRoute.post("/login");
userRoute.post("forgot_password");
userRoute.post("/change_password");

export default userRoute;
