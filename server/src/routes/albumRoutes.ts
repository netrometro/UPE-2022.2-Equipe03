import { Router } from "express";

import AlbumController from "../controllers/AlbumController";

const albumRouter = Router();

albumRouter.get("/album/:userId", AlbumController.findAlbum);
albumRouter.post("/album/create", AlbumController.createAlbum);
albumRouter.post("/album/sell", AlbumController.sellAlbum);
albumRouter.put("/album/feed/:userId", AlbumController.feedCats)
albumRouter.get("/album/:userId/lastClickedDate", AlbumController.lastClick)
albumRouter.put("/album/:userId/UpdatelastClickedDate", AlbumController.updateLastClick)
albumRouter.put("/album/stick/:userId", AlbumController.stick)

export { albumRouter };
