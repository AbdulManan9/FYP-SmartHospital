import AdmissionRecordModel from "../models/AdmitRecordModel.js";
import WardModel from "../models/WardModels/WardModel.js";
import PatientModel from "../models/PatientModel.js";
import appointmentModel from "../models/AppointmentModel.js";
import bedModel from "../models/WardModels/BedModel.js";
import RoomModule from "../models/WardModels/RoomModel.js";
const admitPatient = async (req, resp) => {
    try {
        const { patient_id, doctor_id, ward_id, appointment_id } = req.body;

        // Validate required fields
        if (!ward_id || !patient_id || !doctor_id) {
            return resp.status(400).json({
                success: false,
                message: "Ward ID, Patient ID and Doctor ID are required"
            });
        }

        // Check if ward exists
        const ward = await WardModel.findById(ward_id);
        if (!ward) {
            return resp.status(404).json({
                success: false,
                message: "No ward exists with this ID"
            });
        }

        // ✅ Check room beds in the selected ward
        const rooms = await RoomModule.find({ ward: ward_id });

        if (!rooms.length) {
            return resp.status(404).json({
                success: false,
                message: "No rooms found in this ward"
            });
        }

        // ✅ Check if all rooms have totalBeds = 0
        const allBedsZero = rooms.every(room => room.totalBeds === 0);
        if (allBedsZero) {
            return resp.status(400).json({
                success: false,
                message: "No beds available in this ward"
            });
        }

        // Find appointment
        const appointment = await appointmentModel.findById(appointment_id);
        if (appointment?.status === "Complete") {
            return resp.json({
                success: false,
                message: "This appointment is already complete"
            });
        }

        // Check if patient exists
        const patient = await PatientModel.findById(patient_id);
        if (!patient) {
            return resp.status(404).json({
                success: false,
                message: "No patient exists with this ID"
            });
        }

        // Check if patient is already admitted
        const admit = await AdmissionRecordModel.findOne({ patient_id });

        if (!admit) {
            const newAdmit = new AdmissionRecordModel({
                patient_id,
                doctor_id,
                ward_id
            });

            await newAdmit.save();

            if (appointment) {
                appointment.status = "Complete";
                await appointment.save();
            }

            return resp.status(200).json({
                success: true,
                message: "Patient admitted successfully",
                data: newAdmit
            });
        }

        if (admit.status === "Admit" || admit.status === "Pending") {
            if (appointment) {
                appointment.status = "Complete";
                await appointment.save();
            }

            return resp.json({
                success: false,
                message: "Patient is already admitted in ward"
            });
        }

        // If previous status is different, admit again
        const newAdmit = new AdmissionRecordModel({
            patient_id,
            doctor_id,
            ward_id
        });

        await newAdmit.save();

        if (appointment) {
            appointment.status = "Complete";
            await appointment.save();
        }

        return resp.status(200).json({
            success: true,
            message: "Patient admitted successfully",
            data: newAdmit
        });

    } catch (error) {
        console.error("Admit patient error:", error);
        return resp.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



//total admited patient by one doctor

const totaladmitPatient = async (req, resp) => {
    const doctor_id = req.params;
    console.log(doctor_id);
    
    try {
        // Find records with status "Pending" or "Admit" (excluding "Discharge")
        const totaladmit = await AdmissionRecordModel.find({
            ...doctor_id,
            status: { $in: ["Pending", "Admit"] }  // Only include these statuses
        })
        .populate('patient_id')
        .populate('doctor_id')
        .populate('room_id')
        .populate('bed_id')
        .populate('ward_id');
        
        console.log(totaladmit);
        const length = totaladmit.length;
        
        resp.json({
            success: true,
            data: totaladmit,
            total: length
        });
    }
    catch (error) {
        console.error("Error in totaladmitPatient API:", error);
        resp.status(500).json({
            success: false,
            message: "Error in API",
            error: error.message
        });
    }
}

//Find admission redoctor of patient

const admitRecord = async (req, resp) => {
    const { patient_id } = req.body;
    const status = "Admit"
    try {
        const AdmitRecord = await AdmissionRecordModel.findOne({ patient_id, status }).populate('room_id').populate('bed_id').populate('ward_id');
        if (!AdmitRecord) {
            return resp.json({
                success: false,
                message: "The pateint is not admit",
            })
        }
        return resp.json({
            success: true,
            data: AdmitRecord
        })
    }
    catch (error) {
        console.log(error);
        return resp.json({
            success: false,
            message: "Error in api",
            error: error
        })
    }
}

// api to discharge the patient

const dischargePatient=async(req,resp)=>{
    try{
        const { id } = req.params;
        const AdmitRecord = await AdmissionRecordModel.findById(id);

        if(!AdmitRecord){
            return resp.json({
                success:false,
                message:"There is no admit record exist",
            })
        }
        AdmitRecord.status="Discharge";
        await AdmitRecord.save();
        const room=await RoomModule.findById(AdmitRecord.room_id);
        const bed=await bedModel.findById(AdmitRecord.bed_id);
        room.totalBeds=room.totalBeds+1;
        await room.save();
        bed.bed_status="available";
        await bed.save();
        console.log("Bed is");
        console.log(bed);
        return resp.json({
            success:true,
            message:"Patient is discharge sucessfully",
        })
    }
    catch(error){
        console.log(error);
        return resp.json({
            success:false,
            message:"Error in api",
            error:error
        })
    }
}

// total patient admit in room
const PatientInRoom=async(req,resp)=>{
    const {room_id}=req.params;
    const status="Admit";
    try{
        const patient=await AdmissionRecordModel.find({room_id:room_id,status:status}).populate('patient_id').populate('doctor_id').populate('ward_id').populate('bed_id');
        if(patient.length===0){
            return resp.json({
                success:false,
                message:"There is no patient admit in this room",
            })
        }
        resp.json({
            success:true,
            message:"Admited Patient List",
            data:patient,
        })
    }
    catch(error){
        console.log(error);
        resp.json({
            success:false,
            message:"Error in api",
            error:error
        })
    }
}


// Discharge Patient List

const dischargePatientList=async(req,resp)=>{
    try{
        const ward_id=req.params.ward_id;
        const status="Discharge";
        const PatientList=await AdmissionRecordModel.find({ward_id,status}).populate('patient_id').populate('doctor_id').populate('ward_id').populate('bed_id').populate('room_id');
        if(PatientList.length==0){
            return resp.json({
                success:false,
                message:"There is no discharge Patient exist"
            })
        }
        return resp.json({
            success:true,
            messahe:"The List of Discharge Patient",
            data:PatientList
        })
        
    }
    catch(error){
        console.log(error);
        return resp.json({
            success:false,
            message:"Error in api",
            error:error
        })
    }
}
export { admitPatient, totaladmitPatient, admitRecord,dischargePatient,PatientInRoom,dischargePatientList };
