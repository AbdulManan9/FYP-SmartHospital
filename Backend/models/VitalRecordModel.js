import mongoose from "mongoose";

const vitalRecordSchema=new mongoose.Schema({
    patient_id:{type:mongoose.Schema.Types.ObjectId,ref:"Patient"},
    nurse_id:{type:mongoose.Schema.Types.ObjectId,ref:"Nurse"},
    bloodPressure:{type:Number},
    oxygenLevel:{type:Number},
    sugarLevel:{type:Number},
    pulseRate:{type:Number},
    createdAt:{type:Date,default:Date.now},
    
})

const VitalRecordModel=mongoose.model.Vital || mongoose.model("Vital",vitalRecordSchema);
export default VitalRecordModel;