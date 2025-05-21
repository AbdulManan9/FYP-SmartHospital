import express from "express";
import { addWardAdmin, AdmitedList, AdmitList, admitPendingPatient, ListRoom, ListWardAdmin, loginWardAdmin } from '../controller/WardAdminController.js';
const wardAdminRouter=express.Router();

wardAdminRouter.post("/addWardAdmin",addWardAdmin);
wardAdminRouter.get("/listwardAdmin",ListWardAdmin);
wardAdminRouter.post("/admitList",AdmitList);
wardAdminRouter.post("/admitedList",AdmitedList);
wardAdminRouter.post("/ListRoom",ListRoom);
wardAdminRouter.post("/admitPendingPatient",admitPendingPatient);
wardAdminRouter.post("/loginWardAdmin",loginWardAdmin);
export default wardAdminRouter;