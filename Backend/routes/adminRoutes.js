import express from 'express';
import { addAdmin, forgetPassword, loginAdmin, updatePassword } from '../controller/AdminController.js';
// import updatePassword from "../controller/AdminController.js";

const adminRouter=express.Router();
adminRouter.get("/updatePassword",updatePassword);
adminRouter.post("/addAdmin",addAdmin);
adminRouter.post("/Login",loginAdmin);
adminRouter.post("/ForgetPassword",forgetPassword);

export default adminRouter;