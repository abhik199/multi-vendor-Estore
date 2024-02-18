import { Router } from "express";
import { venderController } from "../controllers/vender.controller";

const venderRoute = Router();

venderRoute.post("/login", venderController.venderLogin);
venderRoute.post("/register", venderController.createVender);
venderRoute.patch("/update", venderController.updateVender);

export default venderRoute;
