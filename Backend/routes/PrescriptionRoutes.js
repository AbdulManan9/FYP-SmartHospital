import express from 'express'

import { addPrescription, DeletePrescription, PrescriptionRecord } from '../controller/PrescriptionRecordController.js'

const PrescriptionRouter=express.Router();
PrescriptionRouter.post("/addPrescription",addPrescription);
PrescriptionRouter.get("/findPrescription/:medicalRecord_id",PrescriptionRecord);
PrescriptionRouter.delete("/deletePrescription/:id",DeletePrescription);

export default PrescriptionRouter;