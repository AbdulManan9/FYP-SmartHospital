import express from 'express';
import { findPatientAppointment, PatientAppointmentDetail, takeAppointment, totalAppointment } from '../controller/AppointmentController.js';

const appointmentRouter=new express.Router();
appointmentRouter.post("/takeAppointment",takeAppointment);
appointmentRouter.post("/totalAppointment",totalAppointment);
appointmentRouter.post("/findAppointment",findPatientAppointment);
appointmentRouter.post("/PatientAppointnmentDetail",PatientAppointmentDetail);

export default appointmentRouter;