import express from "express";
import { admitPatient } from "../controller/AdmitRecordcontroller.js";
import { totaladmitPatient } from "../controller/AdmitRecordcontroller.js";
const admitRecordRouter=express.Router();
admitRecordRouter.post("/admitPatient",admitPatient);
admitRecordRouter.get("/totaladmit/:doctor_id",totaladmitPatient);
export default admitRecordRouter;
