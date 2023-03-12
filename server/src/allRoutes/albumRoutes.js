import { Router } from "express";

import AlbumController from "../controllers/AlbumController";

const albumRouter = Router();


albumRouter.post("/album/:albumId", AlbumController.findAlbum);


export { albumRouter };