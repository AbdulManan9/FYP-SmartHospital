import DoctorModel from "../models/doctorModel.js";
import DoctorScheduleModel from "../models/DoctorScheduleModel.js";

const addOrUpdateTimetable = async (req, res) => {
    try {
        const { doctor_id, schedules } = req.body;

        // Debugging log to check what is received
        console.log("Received body:", req.body);

        // Validate input
        if (!doctor_id || !schedules ) {
            return res.status(400).json({ success: false, message: "Invalid data: schedules must be an array" });
        }

        // Check if doctor exists
        const doctor = await DoctorModel.findById(doctor_id);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Find doctor's timetable
        let timetable = await DoctorScheduleModel.findOne({ doctor_id });

        if (timetable) {
            // Loop through new schedules and merge them into the existing schedule
            schedules.forEach(newSchedule => {
                const existingDay = timetable.schedules.find(s => s.day === newSchedule.day);
                if (existingDay) {
                    // Update time slots if the day already exists
                    existingDay.timeSlots = newSchedule.timeSlots;
                } else {
                    // Add new day schedule
                    timetable.schedules.push(newSchedule);
                }
            });

            await timetable.save();
        } else {
            // Create new timetable entry
            timetable = new DoctorScheduleModel({ doctor_id, schedules });
            await timetable.save();
        }

        res.json({ success: true, message: "Timetable updated successfully", timetable });

    } catch (error) {
        console.error("Error in addOrUpdateTimetable:", error);
        res.status(500).json({ success: false, message: "Error updating timetable" });
    }
};

export { addOrUpdateTimetable };
