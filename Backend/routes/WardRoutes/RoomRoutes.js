import express from 'express';
import { AddRoom, findRooms, ListBeds } from '../../controller/WardController/RoomController.js';

const RoomRouter=express.Router();
RoomRouter.post("/addRoom",AddRoom);
RoomRouter.get("/Rooms/:id",findRooms);
RoomRouter.post("/beds",ListBeds);

export default RoomRouter;