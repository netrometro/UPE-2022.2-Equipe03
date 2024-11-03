import { Router } from "express";

import InvController from "../controllers/InvController";
import stickerPackController from "../controllers/stickerPackController";

const inventarioRouter = Router();

//FIXME: da pra mudar de invId para userId
inventarioRouter.get("/inventario/:invId", InvController.findInv);
inventarioRouter.get("/inventario/Pac/:invId", stickerPackController.findInv);

export { inventarioRouter };