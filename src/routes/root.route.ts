import { Router } from "express";
import adminRoute from "./admin.route";
import venderRoute from "./vender.route";
import userRoute from "./user.route";

const rootRoute = Router();

rootRoute.use("/admin", adminRoute);
rootRoute.use("/vendor", venderRoute);
rootRoute.use("/user", userRoute);

export default rootRoute;
