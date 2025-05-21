import express from 'express';
import { completeAppointment, findPatientAppointment, getTodaysAppointments, PatientAppointmentDetail, takeAppointment, totalAppointment } from '../controller/AppointmentController.js';

const appointmentRouter=new express.Router();
appointmentRouter.post("/takeAppointment",takeAppointment);
appointmentRouter.post("/totalAppointment",totalAppointment);
appointmentRouter.post("/findAppointment",findPatientAppointment);
appointmentRouter.post("/PatientAppointnmentDetail",PatientAppointmentDetail);
appointmentRouter.put("/completeAppointment/:appointment_id",completeAppointment);
appointmentRouter.get("/todayAppointment/:doctor_id",getTodaysAppointments);

export default appointmentRouter;