import { Router } from "express";

import GatController from "../controllers/GatController";
import gatexController from "../controllers/gatexController";
const gatRouter = Router();


gatRouter.post("/gaturinha/:userId", GatController.createGaturinha);
gatRouter.post("/compra", GatController.createCompra);
gatRouter.get("/gatex", gatexController.findAllgaturinhas);

export { gatRouter };