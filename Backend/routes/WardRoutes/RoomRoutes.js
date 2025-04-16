import express from 'express';
import { AddRoom, findRooms } from '../../controller/WardController/RoomController.js';

const RoomRouter=express.Router();
RoomRouter.post("/addRoom",AddRoom);
RoomRouter.get("/Rooms/:id",findRooms);

export default RoomRouter;