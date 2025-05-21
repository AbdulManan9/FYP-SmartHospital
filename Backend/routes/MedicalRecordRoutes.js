import express from 'express'
import { addMedicalRecord, FindPatientRecord, PatientMedical } from '../controller/MedicalRecord.js'

const MedicalRecordRouter=new express.Router();
MedicalRecordRouter.post("/addMedicalRecord",addMedicalRecord);
MedicalRecordRouter.get("/PatientRecord/:patient_id",FindPatientRecord);
MedicalRecordRouter.get("/PatientMedicalRecord/:cnic",PatientMedical);
export default MedicalRecordRouter;