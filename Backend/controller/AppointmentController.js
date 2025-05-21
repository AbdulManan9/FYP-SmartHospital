import PatientModel from "../models/PatientModel.js";
import AppointmentModel from "../models/AppointmentModel.js";
import DoctorModel from "../models/doctorModel.js";
import DoctorScheduleModel from "../models/DoctorScheduleModel.js";
import validateAppointment from "../Validation/AppointmentValidation.js";
import AdmissionRecordModel from "../models/AdmitRecordModel.js";
// import validator from 'validator';
import appointmentModel from "../models/AppointmentModel.js";

const takeAppointment = async (req, resp) => {
    const { error } = validateAppointment(req.body);
    
    try {
        const { cnic, doctor_id, reason, appointmentDate } = req.body;

        if (error) {
            return resp.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        // Get doctor details
        const doctor = await DoctorModel.findById(doctor_id);
        if (!doctor) {
            return resp.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Get doctor's schedule
        const doctorSchedule = await DoctorScheduleModel.findOne({ doctor_id });
        if (!doctorSchedule) {
            return resp.status(404).json({ success: false, message: "Doctor schedule not found" });
        }

        
        

        // Convert appointment date to day name
        const appointmentDay = new Date(appointmentDate).toLocaleDateString("en-US", { weekday: "long" });

        // Check if doctor is available on the selected date
        const scheduleForDay = doctorSchedule.schedules.find(schedule => schedule.day === appointmentDay);
        if (!scheduleForDay) {
            return resp.status(400).json({
                success: false,
                message: `Doctor is not available on ${appointmentDay}. Please select another date.`,
            });
        }

        // Get available time slots for the day
        const availableTimeSlot = scheduleForDay.timeSlots;

        // Count existing appointments for the doctor on the selected date
        const appointmentCount = await AppointmentModel.countDocuments({ doctor_id, appointmentDate });

        // Check if patient already exists
        let patient = await PatientModel.findOne({ cnic });
         
        if (!patient) {
            patient = new PatientModel({
                name: req.body.name,
                dateOfBirth: req.body.dateOfBirth,
                Gender: req.body.Gender,
                contactNo: req.body.contactNo,
                cnic: req.body.cnic,
            });
            await patient.save();
        }
        else{
            const activeAdmission = await AdmissionRecordModel.findOne({
                    patient_id: patient._id,
                    status: "admitted"
                });
                
                if (activeAdmission) {
                    return resp.status(400).json({
                        success: false,
                        message: "Patient is already admitted and cannot book a new appointment right now."
                    });
                }
        }

        // Book the appointment
        const newAppointment = new AppointmentModel({
            patient_id: patient._id,
            doctor_id,
            appointmentDate,
            reason,
        });

        await newAppointment.save();

        return resp.json({
            appointmentCount: appointmentCount + 1,
            success: true,
            message: `Appointment confirmed on ${appointmentDate} your appointment Number ${appointmentCount + 1}`,
            appointmentDate,
            availableTimeSlot, // Send available time for that day
            // Send number of appointments after booking
        });

    } catch (error) {
        console.error("Error in takeAppointment:", error);
        return resp.status(500).json({ success: false, message: "Error in API" });
    }
};

// Find total appointments of doctor

const totalAppointment = async (req, resp) => {
    try {
        const doctor_id = req.body.doctor_id;
        console.log(doctor_id);
        const totalAppointment = await AppointmentModel.find({ doctor_id }).populate('patient_id').populate('doctor_id');
        const Total = totalAppointment.length;
        if (Total > 0) {
            console.log("Appointment found")
            resp.json({
                success: true,
                message: "Appointment Found",
                data: totalAppointment,
                totalData: Total
            })

        }
        else {
            console.log("Appointment not found");
            resp.json({
                success: false,
                message: "Appointment not found",
            })
        }
    }
    catch (error) {
        console.log(error);
        return resp.json({
            success: false,
            message: "Error in api integration"
        })
    }
}

const findPatientAppointment = async (req, resp) => {
    const { doctor_id, cnic } = req.body;

    try {
        const patient = await PatientModel.findOne({ cnic }); // This returns a single document, not an array
        if (!patient) {
            return resp.json({
                success: false,
                message: "There is no patient with this CNIC",
            });
        }
        const patient_id=patient._id;
        const Searchappointmets=await appointmentModel.find({patient_id,doctor_id});
        if(Searchappointmets.length>0){
            resp.json({
                success:true,
                message:"Appointment found",
                data:Searchappointmets,
            })
        }
        else{
            resp.json({
                success:false,
                message:"There is no appointment exist with this cnic"
            })
        }
        
    } catch (error) {
        resp.json({
            success: false,
            message: "Error in API",
            error: error.message,
        });
        console.log(error);
    }
};

const PatientAppointmentDetail = async (req, resp) => {
    const { patient_id, doctor_id } = req.body;
    
    let _id=patient_id;
    console.log(_id);
    try {
        const patient = await PatientModel.findById(_id);
        const Appointment = await AppointmentModel.findOne({ patient_id, doctor_id });

        console.log(patient);
        console.log(Appointment);
        if (!Appointment || !patient) {
            return resp.json({
                success: false,
                message: "There is no appointment that exists",
            });
        } else {
            return resp.json({
                success: true,
                message: "Appointment found",
                appointment: Appointment,
                patient: patient
            });
        }
    } catch (error) {
        console.error(error);
        resp.status(500).json({
            success: false,
            message: "Error in API",
            error: error.message,
        });
    }
};

// Find Today appointment

const getTodaysAppointments = async (req, resp) => {
    try {
        const {doctor_id}=req.params;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`; // format: "YYYY-MM-DD"

        const appointments = await appointmentModel.find({ appointmentDate: formattedDate,doctor_id:doctor_id }).populate('patient_id').populate('doctor_id');
        
        

        return resp.json({
            success: true,
            message: "Today's appointments fetched successfully",
            data: appointments,
            total:appointments.length
        });
    } catch (error) {
        console.error("Error fetching today's appointments:", error);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// complete appointment

const completeAppointment=async(req,resp)=>{
    const {appointment_id}=req.params;
    try{
        const appointment= await AppointmentModel.findById(appointment_id);
        console.log(appointment);
        if(appointment.status=="Pending"){
            appointment.status="Complete";
            await appointment.save();
            resp.json({
                success:true,
                message:"Appointment is Complete Successfully",
            })
        }
        else{
            resp.json({
                success:false,
                message:"Appointment is already Complete"
            })
        }
    }
    catch(error){
        console.log(error);
        resp.json({
            success:false,
            message:"Error in api",
        })
    }
}


export { takeAppointment, totalAppointment, findPatientAppointment,PatientAppointmentDetail,completeAppointment,getTodaysAppointments };
