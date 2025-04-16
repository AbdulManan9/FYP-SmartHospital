import RoomModule from "../../models/WardModels/RoomModel.js";

const AddRoom=async (req,resp)=>{
    try{
        const addRoom=new RoomModule({
            roomNumber:req.body.roomNumber,
            ward:req.body.ward,
            totalBeds:req.body.totalBeds
        })
        addRoom.save();
        resp.json({
            success:true,
            message:"Room Addes Successfully"
        })
        console.log(addRoom)
    }
    catch(error){
        resp.json({
            success:'false',
            message:"Room not added Successfully"
        })
        console.log(error);
    }

}

const findRooms=async(req,resp)=>{
    try{
        const room_id=req.params.id;
        console.log("Room id");
        console.log(room_id);
        const rooms=await RoomModule.find({ ward : room_id });
        console.log(rooms);
        resp.json({
            success:true,
            message:"Room find sucessfully",
            data:rooms,
        })
        console.log(rooms);
    }
    catch(error){
        resp.json({
            success:false,
            message:"Room not find Sucessfully",
            error:error,
        })
        console.log(error);
    }
}



export {AddRoom,findRooms};