import { Router } from "express";

import GatController from "../controllers/GatController";

const gatRouter = Router();


gatRouter.post("/gaturinha", GatController.createGaturinha);
gatRouter.post("/compra", GatController.createCompra);


export { gatRouter };