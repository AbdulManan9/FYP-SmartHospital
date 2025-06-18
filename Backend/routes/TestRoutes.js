import express from 'express'

import { addField, addTest, listField, ListTest, PatienttestRec } from '../controller/Testcontroller.js';
import { assighnTest, PatientTests, PendingTests, testResult } from '../controller/TestOrdercontroller.js';

const testRouter=new express.Router();

testRouter.post("/addTest",addTest);
testRouter.post("/addField/:id",addField)
testRouter.get("/ListTest",ListTest);
testRouter.get("/listField/:id",listField);
testRouter.post("/assighnTest",assighnTest);
testRouter.get("/PendingTests",PendingTests);
testRouter.post("/testResult",testResult);
testRouter.get("/PatientTest/:patient_id",PatientTests);
testRouter.get("/PatientTestRec/:cnic",PatienttestRec);
export default testRouter