import { Router } from "express";
import { create_user } from "../controllers/user.controller";

const userRoute = Router();

userRoute.post("/register", create_user);
userRoute.post("/login");

export default userRoute;
