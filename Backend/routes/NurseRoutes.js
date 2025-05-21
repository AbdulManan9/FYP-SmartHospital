import express from "express";
import { addNurse, AllNurses, FindNurse, loginNurse, personlDetail } from "../controller/NurseController.js";

const NurseRouter=express.Router();

NurseRouter.post("/addNurse",addNurse);
NurseRouter.get("/allNurses",AllNurses);
NurseRouter.post("/find",FindNurse);
NurseRouter.get("/persnolDetail/:patient_id",personlDetail);
NurseRouter.post("/login",loginNurse);

export default NurseRouter;