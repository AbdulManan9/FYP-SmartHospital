import express from 'express';
import { AddWard, ListWard, SearchWard } from "../../controller/WardController/WardController.js";

const wardRouter=express.Router();


//Ward Details end point
wardRouter.post("/addWard",AddWard);
wardRouter.get("/listWard",ListWard);
wardRouter.get("/SearchWard/:id",SearchWard);
export default wardRouter;