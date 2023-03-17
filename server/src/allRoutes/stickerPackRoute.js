import { Router } from "express";
import stickerPackController from "../controllers/stickerPackController";
const pacRouter = Router();


pacRouter.post("/compra/Pac", stickerPackController.createCompraPac);
pacRouter.get("/stickerPackStore",stickerPackController.findAllpackages );
export { pacRouter };