    import mongoose from "mongoose";

const nurseSchema=new mongoose.Schema({
    name:{type:String},
    dob:{type:String},
    Gender:{type:String},
    contactNo:{type:String},
    Department:{type:String},
    Designation:{type:String},
    Shift:{type:String},
},
{ timestamps: true })

const NurseModel= mongoose.model.Nurse || mongoose.model("Nurse",nurseSchema);
export default NurseModel;