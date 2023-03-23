import { Router } from "express";
import DailyController from "../controllers/DailyController";
import DailyPController from "../controllers/DailyPController";

const dailyRouter = Router();

dailyRouter.put("/daily/:userId", DailyController.updateMoney);
dailyRouter.put("/dailyp/:invId", DailyPController.getPackage);

export {dailyRouter};