import DoctorModel from "../models/doctorModel.js"; // Importing the Doctor model
import fs from 'fs'; // Importing the filesystem module 

// Controller for adding doctor details
const addDoctor = async (req, res) => {
    try {
        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded",
            });
        }

        // Extract the uploaded image filename
        const imageFilename = req.file.filename;

        // Create a new Doctor instance with data from the request body
        const newDoctor = new DoctorModel({
            doctorName: req.body.doctorName,
            Gender: req.body.Gender,
            DateOfBirth: req.body.DateOfBirth,
            Email: req.body.Email,
            Specialization: req.body.Specialization,
            Qualification: req.body.Qualification,
            Experience: req.body.Experience,
            HospitalDepartment: req.body.HospitalDepartment,
            WorkingHours: req.body.WorkingHours,
            WorkingDays: req.body.WorkingDays,
            Shift: req.body.Shift,
            image: imageFilename, // Add the image filename
        });

        // Save the new doctor to the database
        await newDoctor.save();

        // Respond with success message
        res.json({
            success: true,
            message: "Doctor details added successfully",
        });
        console.log("Doctor added successfully");
    } catch (error) {
        // Handle errors and respond with a failure message
        res.status(500).json({
            success: false,
            message: "Failed to add doctor details",
            error: error.message,
        });
        console.error("Error during doctor addition:", error.message, error.stack);
    }
};


// controller to view list of all doctor details

const viewDoctorsList=async(req,resp)=>{
    try{
        const doctorsList=await DoctorModel.find({});
        resp.json({success:true,message:"View all Doctor Details",data:doctorsList})
        console.log(doctorsList);
        
    }
    catch(error){
        resp.json({success:true,message:"Error"});
        console.log(error);
    }

}

//Controller to remove doctor details
const removeDoctor = async (req, resp) => {
    try {
        const doctorId = req.body.id; // Extract the doctor ID from the request body

        // Find and delete the doctor by ID
        const deletedDoctor = await DoctorModel.findByIdAndDelete(doctorId);

        // Check if a doctor was found and deleted
        if (deletedDoctor) {
            resp.json({
                success: true,
                message: "Doctor deleted successfully",
                deletedDoctor,
            });
        } else {
            resp.json({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        // Handle errors
        resp.json({
            success: false,
            message: "Failed to delete doctor",
            error: error.message,
        });
        console.log(error); // Log the error for debugging
    }
};

//Find Doctor using id

const findDoctor = async (req, resp) => {
    try {
        const doctorId = req.params.id; // Extract doctor ID from route params

        // Find doctor by ID
        const doctor = await DoctorModel.findOne({ _id: doctorId });

        if (doctor) {
            resp.json({
                success: true,
                message: "Doctor found successfully",
                data:doctor // Include doctor details in response
            });
            console.log(doctor);
        } else {
            resp.json({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        resp.json({
            success: false,
            message: "Failed to find doctor",
            error: error.message, // Include error details for debugging
        });
        console.error(error);
    }
};


// Find doctor using name


const findDoctorName = async (req, resp) => {
    try {
        const doctorName = req.params.doctorName; // Extract doctor ID from route params

        // Find doctor by ID
        const doctor = await DoctorModel.findOne({ doctorName: doctorName });

        if (doctor) {
            resp.json({
                success: true,
                message: "Doctor found successfully",
                data:doctor // Include doctor details in response
            });
            console.log(doctor);
        } else {
            resp.json({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        resp.json({
            success: false,
            message: "Failed to find doctor",
            error: error.message, // Include error details for debugging
        });
        console.error(error);
    }
};

// Update detail of doctor controller
const updateDoctor = async (req, resp) => {
    try {
        const doctorId = req.params.id; // Extract doctor ID from route parameters
        const updatedDetails = req.body; // Extract new doctor details from request body

        // Update the doctor's details
        const updatedDoctor = await DoctorModel.findByIdAndUpdate(
            doctorId, // ID of the doctor to update
            updatedDetails, // New details to update
            { new: true } // Return the updated document
        );

        // If the doctor is found and updated
        if (updatedDoctor) {
            resp.json({
                success: true,
                message: "Doctor details updated successfully",
                doctor: updatedDoctor, // Return updated doctor details
            });
        } else {
            resp.json({
                success: false,
                message: "Doctor not found",
            });
        }
    } catch (error) {
        resp.json({
            success: false,
            message: "Failed to update doctor details",
            error: error.message, // Include error message for debugging
        });
        console.error(error); // Log the error for debugging
    }
};



export { addDoctor,viewDoctorsList,removeDoctor,findDoctor,updateDoctor,findDoctorName };
