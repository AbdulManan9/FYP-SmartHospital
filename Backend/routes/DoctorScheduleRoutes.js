import express from 'express'
import { addOrUpdateTimetable, findSchedule } from "../controller/DoctorScheduleController.js";
const ScheduleRouter=new express.Router();
ScheduleRouter.post("/addSchedule",addOrUpdateTimetable)
ScheduleRouter.get("/findSchedule/:doctorId",findSchedule)
export default ScheduleRouter;