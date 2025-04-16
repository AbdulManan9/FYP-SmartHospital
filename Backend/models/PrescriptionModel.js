import mongoose from 'mongoose';

const prescriptionModelSchema=new mongoose.Schema({
    medicalRecord_id:{type:mongoose.Schema.Types.ObjectId,ref:"MedicalRecord"},
    doctor_id:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
    prescriptionDate:{type:Date,default:Date.now},
    medicineName:{type:String},
    dosage:{type:String},
    frequency:{type:String},
    duration:{type:String},
    instruction:{type:String},
})

const PrescriptionModel=mongoose.model.Prescription || mongoose.model("Prescription",prescriptionModelSchema);
export default PrescriptionModel;