import { Router } from "express";

import InvController from "../controllers/InvController";
import stickerPackController from "../controllers/stickerPackController";
import { pacRouter } from "./stickerPackRoute";

const inventarioRouter = Router();

//TODO: da pra mudar de invId para userId
inventarioRouter.get("/inventario/:invId", InvController.findInv);
inventarioRouter.get("/inventario/Pac/:invId", stickerPackController.findInv);
export { inventarioRouter };