import express from "express";

import { addVital, getVital } from "../controller/VitalRecordController.js";

const vitalRecordRouter=new express.Router();
vitalRecordRouter.post("/addVital",addVital);
vitalRecordRouter.post("/getVital",getVital);

export default vitalRecordRouter;