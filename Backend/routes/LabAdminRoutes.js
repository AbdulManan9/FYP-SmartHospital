import express from 'express'
import { addLabAdmin, loginLabAdmin } from '../controller/LabAdminController.js';
const labAdminRouter=express.Router();

labAdminRouter.post("/addLabAdmin",addLabAdmin);
labAdminRouter.post("/login",loginLabAdmin);

export default labAdminRouter;

