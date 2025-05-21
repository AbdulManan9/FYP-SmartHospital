import express from 'express';
import { addDoctor,viewDoctorsList,removeDoctor,findDoctor,updateDoctor, findDoctorName, setPassword, logindoctor, updateDoctorPassword } from '../controller/DoctorContoller.js';

import multer from 'multer';

const DoctorRouter=express.Router();

//Image Storage Ingine

const storage=multer.diskStorage({
    destination:"DoctorImages",
    filename:(req,file,cb)=>{                            // cb stand for call back
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const DoctorImages=multer({storage:storage})
// Doctor details end points
DoctorRouter.post("/add",DoctorImages.single("image"),addDoctor);
DoctorRouter.get("/getallDoctor",viewDoctorsList);
DoctorRouter.delete("/deleteDoctor",removeDoctor);
DoctorRouter.get("/findDoctor/:id",findDoctor);
DoctorRouter.get("/findDoctorbyNmae/:doctorName",findDoctorName);
DoctorRouter.put("/updateDoctors/:id",updateDoctor);
DoctorRouter.post("/setPassword",setPassword);
DoctorRouter.post("/login",logindoctor)
DoctorRouter.post("/update",updateDoctorPassword);
export default DoctorRouter;