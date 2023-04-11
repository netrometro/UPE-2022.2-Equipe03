import { Router } from "express";

import AlbumController from "../controllers/AlbumController";

const albumRouter = Router();

albumRouter.get("/album/:userId", AlbumController.findAlbum);
albumRouter.post("/album/create", AlbumController.createAlbum);
albumRouter.post("/album/sell", AlbumController.sellAlbum);

export { albumRouter };
