import mongoose from "mongoose";

const ScheduleSchema=new mongoose.Schema({
    doctor_id:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
    schedules: [
        {
            day: {type:String},  
            timeSlots: {type:String},
        }
    ]
})

const DoctorScheduleModel=mongoose.model.Schedule || mongoose.model("Schedule",ScheduleSchema);
export default DoctorScheduleModel;