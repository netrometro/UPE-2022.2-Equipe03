import { Router } from "express";

import InvController from "../controllers/InvController";

const inventarioRouter = Router();

//TODO: da pra mudar de invId para userId
inventarioRouter.get("/inventario/:invId", InvController.findInv);

export { inventarioRouter };