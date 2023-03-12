import { Router } from "express";
import DailyController from "../controllers/DailyController";

const dailyRouter = Router();

dailyRouter.update("/daily", DailyController.updateMoney);

export {dailyRouter};