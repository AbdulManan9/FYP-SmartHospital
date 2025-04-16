import mongoose from 'mongoose'

const medicalRecordSchema=new mongoose.Schema({
    doctor_id:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
    patient_id:{type:mongoose.Schema.Types.ObjectId,ref:"Patient"},
    dignosis:{type:String},
    treatmentPlan:{type:String},
    History:{type:String},
    date:{type: Date, default: Date.now}
})

const MedicalRecordModel= mongoose.model.MedicalRecord || mongoose.model("MedicalRecord",medicalRecordSchema);
export default MedicalRecordModel;