import { Router } from "express";

import InvController from "../controllers/InvController";

const inventarioRouter = Router();

inventarioRouter.get("/inventario/:invId", InvController.findInv);

export { inventarioRouter };