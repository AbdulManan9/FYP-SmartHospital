import mongoose from "mongoose";

const RoomsSchema=new mongoose.Schema({
    roomNumber:{type:String},
    ward:{type:mongoose.Schema.Types.ObjectId, ref:"wards", require:true},
    totalBeds:{type:Number,default:0}
})

const RoomModule= mongoose.model.Room || mongoose.model("Room",RoomsSchema)
export default RoomModule;