import express from 'express';
import { AddWard, admitPatientInWard, findPatient, getavailableBeds, ListWard, SearchWard } from "../../controller/WardController/WardController.js";

const wardRouter=express.Router();


//Ward Details end point
wardRouter.post("/addWard",AddWard);
wardRouter.get("/listWard",ListWard);
wardRouter.get("/SearchWard/:id",SearchWard);
wardRouter.get("/totalAvailableBeds/:ward_id",getavailableBeds);
wardRouter.get("/totalPatientinWard/:dutyWard",admitPatientInWard);
wardRouter.post("/findPatientInWard",findPatient);
export default wardRouter;