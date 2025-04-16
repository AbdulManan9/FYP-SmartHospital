import express from 'express'
import { addOrUpdateTimetable } from "../controller/DoctorScheduleController.js";
const ScheduleRouter=new express.Router();
ScheduleRouter.post("/addSchedule",addOrUpdateTimetable)
export default ScheduleRouter;