// controller/DoctorController.js
import DoctorModel from '../models/doctorModel.js';
import fs from 'fs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded',
      });
    }

    const { Email } = req.body;
    const imageFilename = req.file.filename;
    const token = crypto.randomBytes(32).toString('hex');
    console.log(Email);

    const newDoctor = new DoctorModel({
      doctorName: req.body.doctorName,
      Gender: req.body.Gender,
      DateOfBirth: req.body.DateOfBirth,
      Email,
      Specialization: req.body.Specialization,
      Qualification: req.body.Qualification,
      Experience: req.body.Experience,
      HospitalDepartment: req.body.HospitalDepartment,
      WorkingHours: req.body.WorkingHours,
      WorkingDays: req.body.WorkingDays,
      Shift: req.body.Shift,
      image: imageFilename,
      token:token,
    });

    await newDoctor.save();

    const link = `http://localhost:3000/set-password/${token}`;
    // const emailHtml = await render(<SetPasswordEmail url={link} />);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'abdullah.naeem6189@gmail.com',
          pass: 'dysrieeigwyeeslt'
        }
      });

      var mailOptions = {
        from: 'abdullah.naeem6189@gmail.com',
        to: Email,
        subject: 'Sending Email using Node.js',
        html: `<p>Click <a href="http://localhost:5173/set-password/${token}">here</a> to set your password.</p>`,

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {

          console.log(error);
          console.log("error");
        } else {
          console.log('Email sent: ' + info.response);
          console.log("mail send");
        }
      });


    res.json({
      success: true,
      message: 'Doctor details added successfully',
    });
    console.log('Doctor added successfully');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add doctor details',
      error: error.message,
    });
    console.error('Error during doctor addition:', error.message, error.stack);
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

// set Doctor Password

const setPassword=async(req,resp)=>{
    const {token,password,confirmPassword}=req.body;
    if(password != confirmPassword){
        resp.json({
            success:false,
            message:"Password cannot match",
        })
    }
    try{
        const doctor = await DoctorModel.findOne({ token });

    if(!doctor){
        resp.json({
            success:false,
            message:"Invalid token"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    doctor.password = hashedPassword;
    doctor.token = null;
    await doctor.save();
    resp.json(
        {
            success:true,
            message:"Password set sucessfully"
        }
    )
    }
    catch(error){
        resp.json({
            sucess:false,
            message:"Error in api",
            error:error
        })
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

// login doctor api

const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
const logindoctor = async (req, resp) => {
    const { Email, password } = req.body;

    try {
        const doctor = await DoctorModel.findOne({ Email });
        if (!doctor) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Email",
            });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Password",
            });
        }

        const token = createToken(doctor._id);
        return resp.json({      // <<< Also return here (good habit)
            success: true,
            message: "Login Successfully",
            data: doctor,
            token: token,
        });
    } catch (error) {
        console.log(error);
        return resp.json({       // <<< Return even in catch
            success: false,
            message: "Error in api",
            error: error,
        });
    }
};

const updateDoctorPassword = async (req, res) => {
    const { Email } = req.body;
  
    try {
      // 1. Find doctor by email
      const doctor = await DoctorModel.findOne({ Email });
  
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
        });
      }
  
      // 2. Check if password is already hashed
      if (doctor.password.startsWith('$2b$')) {
        return res.status(200).json({
          success: true,
          message: 'Password is already hashed',
        });
      }
  
      // 3. Hash the plain-text password
      const hashedPassword = await bcrypt.hash(doctor.password, 10);
      doctor.password = hashedPassword;
  
      // 4. Save the updated doctor
      await doctor.save();
  
      res.status(200).json({
        success: true,
        message: 'Password hashed and updated successfully',
      });
  
    } catch (error) {
      console.error('Error updating doctor password:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating password',
        error: error.message,
      });
    }
  };
export { addDoctor,viewDoctorsList,removeDoctor,findDoctor,updateDoctor,findDoctorName,setPassword,logindoctor,updateDoctorPassword };
