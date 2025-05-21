import mongoose from 'mongoose'

const bedSchema=new mongoose.Schema({
    room_id:{type:mongoose.Schema.Types.ObjectId,ref:"Room"},
    bed_no:{type:String},
    bed_status:{type:String,default:"Available"},

})
const bedModel=mongoose.model.Bed || mongoose.model("Bed",bedSchema);
export default bedModel;