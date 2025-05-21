import RoomModule from "../../models/WardModels/RoomModel.js";
import bedModel from "../../models/WardModels/BedModel.js";

const AddRoom = async (req, res) => {
  try {
    const { ward, roomNumber, totalBeds } = req.body;

    // Step 1: Save room
    const newRoom = new RoomModule({ ward, roomNumber, totalBeds });
    await newRoom.save();

    // Step 2: Automatically create beds
    const beds = [];
    for (let i = 1; i <= totalBeds; i++) {
      beds.push({
        bed_no: i,
        room_id: newRoom._id,
        bed_status: "available"
      });
    }
    await bedModel.insertMany(beds);

    return res.status(201).json({
      success: true,
      message: "Room and beds created successfully",
    });

  } catch (error) {
    console.error("Error adding room and beds:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create room and beds",
      error: error.message
    });
  }
};

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

// API TO FIND LIST OF BEDS IN ROOM

const ListBeds=async(req,resp)=>{
    try{
        const{room_id}=req.body;
        const list=await bedModel.find({room_id});
        if(list.length>0){
            return resp.json({
                success:true,
                message:"List of bed",
                data:list
            })
        }
        else{
            return resp.json({
                success:false,
                message:"The is no bed exist",
            })
        }
    }
    catch(error){
        console.log(error);
        return resp.json({
            sucess:false,
            message:"Error in api"
        })
    }
}

//api to find total beds in room


export {AddRoom,findRooms,ListBeds};