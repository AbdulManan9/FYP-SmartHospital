import express from 'express'

import { addPrescription, PrescriptionRecord } from '../controller/PrescriptionRecordController.js'

const PrescriptionRouter=express.Router();
PrescriptionRouter.post("/addPrescription",addPrescription);
PrescriptionRouter.get("/findPrescription/:medicalRecord_id",PrescriptionRecord);

export default PrescriptionRouter;