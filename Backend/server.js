import express from "express";
import cors from 'cors';
import connectDb from "./config/db.js";
import DoctorRouter from "./routes/DoctorRoutes.js";
import wardRouter from "./routes/WardRoutes/WardRoutes.js";
import RoomRouter from "./routes/WardRoutes/RoomRoutes.js";
import NurseRouter from "./routes/NurseRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import appointmentRouter from "./routes/AppointmentRoutes.js";
import ScheduleRouter from "./routes/DoctorScheduleRoutes.js";
import MedicalRecordRouter from "./routes/MedicalRecordRoutes.js";
import admitRecordRouter from "./routes/AdmitRecordRoutes.js";
import PrescriptionRouter from "./routes/PrescriptionRoutes.js";
import wardAdminRoutes from "./routes/wardAdminRoutes.js";
import vitalRecordRouter from "./routes/VitalRecordRoutes.js";
import "dotenv/config.js";



//app config
const app=express()
const port=4000

//middleware
app.use(express.json())   //when ever we will get request from frontend to backend that will be parse using his json
app.use(cors())    //we can access the backend from any frontend

// connetion with db
connectDb();

//api end point
app.use("/api/doctor",DoctorRouter);
app.use("/images",express.static('DoctorImages'));
app.use("/api/ward",wardRouter);
app.use("/api/room",RoomRouter);
app.use("/api/nurse",NurseRouter);
app.use("/api/admin",adminRouter);
app.use("/api/appointment",appointmentRouter);
app.use("/api/Schedule",ScheduleRouter);
app.use("/api/MedicalRecord",MedicalRecordRouter);
app.use("/api/admitRecord",admitRecordRouter);
app.use("/api/prescription",PrescriptionRouter);
app.use("/api/wardAdmin",wardAdminRoutes);
app.use("/api/vital",vitalRecordRouter);

app.get("",(req,resp)=>{
    resp.send("Hellow this is my fyp api");
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
