import mongoose from "mongoose";

const wardAdminSchema=new mongoose.Schema({
    name:{type:String},
    phone:{type:String},
    Email:{type:String},
    password:{type:String},
    cnic:{type:String},
    dutyWard:{type:mongoose.Schema.Types.ObjectId,ref:"Ward"},
})

const wardAdminModel= mongoose.model.WardAdmin || mongoose.model("WardAdmin",wardAdminSchema);
export default wardAdminModel;