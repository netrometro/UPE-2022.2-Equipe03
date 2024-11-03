import { Router } from "express";
import DailyController from "../controllers/DailyController";
import DailyPController from "../controllers/DailyPController";

const dailyRouter = Router();

dailyRouter.put("/daily/:userId", DailyController.updateMoney);
dailyRouter.get("/daily/:userId/lastClickedDate", DailyController.lastClick)
dailyRouter.put("/daily/:userId/UpdatelastClickedDate", DailyController.updateLastClick)
dailyRouter.put("/dailyP/:invId", DailyPController.getPackage);
dailyRouter.get("/dailyP/:userId/lastClickedDate", DailyPController.lastClick)
dailyRouter.put("/dailyP/:userId/UpdatelastClickedDate", DailyPController.updateLastClick)
export {dailyRouter};