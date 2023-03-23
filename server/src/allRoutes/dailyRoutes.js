import { Router } from "express";
import DailyController from "../controllers/DailyController";
import DailyPController from "../controllers/DailyPController";

const dailyRouter = Router();

dailyRouter.put("/daily/:userId", DailyController.updateMoney);
dailyRouter.get("/daily/:userId/lastClickedDate", DailyController.lastClick)
dailyRouter.put("/daily/:userId/UpdatelastClickedDate", DailyController.updateLastClick)
export {dailyRouter};