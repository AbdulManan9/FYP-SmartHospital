import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    image:{type:String},
    doctorName:{type:String},
    Gender:{type:String},
    DateOfBirth:{type:String},
    Email:{type:String},
    Specialization:{type:String},  
    Qualification:{type:String},
    Experience:{type:String},
    HospitalDepartment:{type:String},
    WorkingHours:{type:String},
    WorkingDays:{type:String},
    Shift:{type:String},
    password:{type:String,default:'none'},
    token:{type:String},
})

const DoctorModel= mongoose.model.Doctor || mongoose.model("Doctor",doctorSchema)
export default DoctorModel;