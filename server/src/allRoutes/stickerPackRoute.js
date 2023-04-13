import { Router } from "express";
import stickerPackController from "../controllers/stickerPackController";
const pacRouter = Router();


pacRouter.post("/compra/Pac", stickerPackController.createCompraPac);
pacRouter.get("/stickerPackStore",stickerPackController.findAllpackages );
pacRouter.post("/openpack", stickerPackController.openPack);
pacRouter.post("/openAllPacks", stickerPackController.openAllPacks);
export { pacRouter };