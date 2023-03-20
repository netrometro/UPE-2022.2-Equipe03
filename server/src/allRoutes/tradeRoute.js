import { Router } from "express";
import tradeController from "../controllers/tradeController";
const tradeRouter = Router();

tradeRouter.get("/trade/:invId", tradeController.findRepeated);

export { tradeRouter };