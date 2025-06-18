import mongoose from "mongoose";

const LabAdminSchema=new mongoose.Schema({
    name:{type:String},
    phone:{type:String},
    Email:{type:String},
    password:{type:String},
    cnic:{type:String},
})

const labAdminModel= mongoose.model.LabAdmin || mongoose.model("LabAdmin",LabAdminSchema);
export default labAdminModel;