import mongoose from "mongoose";

const nurseSchema=new mongoose.Schema({
    name:{type:String},
    dob:{type:String},
    Gender:{type:String},
    contactNo:{type:String},
    Department:{type:String},
    Designation:{type:String},
    Shift:{type:String},
    Email:{type:String},
    password:{type:String},
    dutyWard:{type:mongoose.Schema.Types.ObjectId,ref:"Ward"},
    token:{type:String}
},
{ timestamps: true })

const NurseModel= mongoose.model.Nurse || mongoose.model("Nurse",nurseSchema);
export default NurseModel;