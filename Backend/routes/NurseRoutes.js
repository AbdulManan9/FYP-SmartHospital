import express from "express";
import { addNurse, AllNurses } from "../controller/NurseController.js";

const NurseRouter=express.Router();

NurseRouter.post("/addNurse",addNurse);
NurseRouter.get("/allNurses",AllNurses);

export default NurseRouter;