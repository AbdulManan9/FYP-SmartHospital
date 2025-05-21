import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    appointmentDate:{type:String},
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed", "Cancelled","Complete"],
        default: "Pending",
    },
    reason: { type: String },
    createdAt:{type:Date,default: Date.now},



})
const appointmentModel = mongoose.model.Appointment || mongoose.model("Appointment", appointmentSchema);
export default appointmentModel;