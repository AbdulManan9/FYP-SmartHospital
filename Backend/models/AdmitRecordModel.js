import mongoose from "mongoose";

const admitRecordSchema=new mongoose.Schema({
    patient_id:{type:mongoose.Schema.Types.ObjectId,ref:"Patient"},
    doctor_id:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
    ward_id:{type:mongoose.Schema.Types.ObjectId,ref:"Ward"},
    room_id:{type:mongoose.Schema.Types.ObjectId,ref:"Room"},
    bed_id:{type:mongoose.Schema.Types.ObjectId,ref:"Bed"},
    admissionDate:{type:Date},
    dischargeDate:{type:Date},
    status:{type:String,default:"Pending"}
})

const AdmissionRecordModel = mongoose.models.admissionRecord || mongoose.model("admissionRecord", admitRecordSchema);
export default AdmissionRecordModel;