import mongoose from "mongoose";

const RoomsSchema=new mongoose.Schema({
    roomNumber:{type:String},
    ward:{type:mongoose.Schema.Types.ObjectId, ref:"wards", require:true},
    totalBeds:{type:Number}
})

const RoomModule= mongoose.model.Room || mongoose.model("Room",RoomsSchema)
export default RoomModule;