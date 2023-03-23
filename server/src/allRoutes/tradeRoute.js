import { Router } from "express";
import tradeController from "../controllers/tradeController";
const tradeRouter = Router();

tradeRouter.get("/trade/:invId", tradeController.findRepeated);
tradeRouter.post("/tradeCards", tradeController.tradeCardsRandom);
tradeRouter.post("/tradeCards/equal", tradeController.tradeCardsEqual)
export { tradeRouter };