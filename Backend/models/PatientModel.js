import mongoose from "mongoose";

const patientSchema=new mongoose.Schema({
    name:{type:String},
    dateOfBirth:{type:String},
    Gender:{type:String},
    contactNo:{type:String},
    Email:{type:String},
    cnic:{type:String},
    
})

const PatientModel= mongoose.model.Patient || mongoose.model("Patient",patientSchema);
export default PatientModel;