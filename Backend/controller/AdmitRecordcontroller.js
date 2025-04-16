import AdmissionRecordModel from "../models/AdmitRecordModel.js";
import WardModel from "../models/WardModels/WardModel.js";
import PatientModel from "../models/PatientModel.js";
import appointmentModel from "../models/AppointmentModel.js";

const admitPatient = async (req, resp) => {
    try {
        const { patient_id, doctor_id, ward_id,appointment_id } = req.body;

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

        //Find Apointment
        const appointment=await appointmentModel.findById(appointment_id);


        // Check if patient exists
        const patient = await PatientModel.findById(patient_id);
        if (!patient) {
            return resp.status(404).json({
                success: false,
                message: "No patient exists with this ID"
            });
        }

        // Check if patient is already admitted
        if (patient.status === "admit") {
            return resp.status(400).json({
                success: false,
                message: "Patient is already admitted"
            });
        }

        // Create admission record
        const newAdmit = new AdmissionRecordModel({
            patient_id,
            doctor_id,
            ward_id
        });

        await newAdmit.save();

        // Update patient's status (optional but recommended)
        patient.status = "admit";
        await patient.save();
        appointment.status="Complete";
        await appointment.save();

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

const totaladmitPatient = async(req,resp)=>{
    
    const doctor_id=req.params;
    console.log(doctor_id);
    try{
        const totaladmit=await AdmissionRecordModel.find(doctor_id);
        console.log(totaladmit);
        const length=totaladmit.length;
        resp.json({
            success:true,
            data:totaladmit,
            total:length
        })
    }
    catch(error){
        resp.json({
            success:false,
            message:"Error in api",
            error:error
        })
    }
}
export { admitPatient,totaladmitPatient };
