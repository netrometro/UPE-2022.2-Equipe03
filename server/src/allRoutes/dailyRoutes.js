import { Router } from "express";
import DailyController from "../controllers/DailyController";

const dailyRouter = Router();

dailyRouter.put("/daily/:userId", DailyController.updateMoney);

export {dailyRouter};