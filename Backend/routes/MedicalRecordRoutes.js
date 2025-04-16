import express from 'express'
import { addMedicalRecord, FindPatientRecord } from '../controller/MedicalRecord.js'

const MedicalRecordRouter=new express.Router();
MedicalRecordRouter.post("/addMedicalRecord",addMedicalRecord);
MedicalRecordRouter.get("/PatientRecord/:patient_id",FindPatientRecord);
export default MedicalRecordRouter;