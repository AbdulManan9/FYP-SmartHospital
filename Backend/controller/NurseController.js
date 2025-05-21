import NurseModel from "../models/NurseModel.js";
import PatientModel from "../models/PatientModel.js";
import WardModel from "../models/WardModels/WardModel.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'


const addNurse = async (req, resp) =>{  
     try {
        const { name, dob, contactNo, Department, Designation, Shift, Email, wardNumber } = req.body;

        // Check if email already exists
        const existingNurse = await NurseModel.findOne({ Email });
        if (existingNurse) {
            return resp.status(409).json({
                success: false,
                message: "This email is already registered",
            });
        }

        // Check if ward number is valid
        const dutyWard = await WardModel.findOne({ wardNumber });
        if (!dutyWard) {
            return resp.status(400).json({
                success: false,
                message: "Invalid ward number. Please enter a valid ward where the nurse will take duty."
            });
        }

        // Generate token and store it (e.g., temporaryToken field)
        const token = crypto.randomBytes(32).toString('hex');

        const newNurse = new NurseModel({
            name,
            dob,
            contactNo,
            Department,
            Designation,
            Shift,
            Email,
            dutyWard: dutyWard._id,
            token: token  // You should add this field in your Nurse schema
        });

        await newNurse.save();

        // Email configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,   // use environment variables
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: Email,
            subject: 'Set Your Nurse Account Password',
            html: `<p>Click <a href="http://localhost:5175/set-Nursepassword/${token}">here</a> to set your password.</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Email sending failed:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        return resp.status(201).json({
            success: true,
            message: "Nurse details added successfully and email sent",
        });

    } catch (error) {
        console.error("Nurse not added:", error);
        return resp.status(500).json({
            success: false,
            message: "Failed to add nurse details",
            error: error.message,
        });
    }
};


// Nurses List Api

const AllNurses = async (req, resp) => {
    try {
        const all_nurses = await NurseModel.find().populate('dutyWard');
        resp.json({
            success: true,
            message: "All Nurses List display successfully",
            data: all_nurses
        })
        console.log(all_nurses)

    }
    catch (error) {
        resp.json({
            success: false,
            message: "All Nurses list not display successfully",
        })
        console.log(error);
    }
}


// Find Nurse
const FindNurse = async (req, resp) => {
    try {
        const { name } = req.body;

        if (!name) {
            return resp.status(400).json({
                success: false,
                message: "Name is required to search nurse"
            });
        }

        const Nurse = await NurseModel.find({ name: name }).populate('dutyWard');

        if (Nurse.length > 0) {
            return resp.json({
                success: true,
                data: Nurse,
            });
        } else {
            return resp.json({
                success: false,
                message: "There is no nurse with this name",
            });
        }
    } catch (error) {
        console.error("Error in this API:", error);  // This will now run
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const personlDetail=async(req,resp)=>{
    const {patient_id}=req.params;
    try{
        const Patient=await PatientModel.findById(patient_id);
        if(!Patient){
            return resp.json({
                success:false,
                message:"The patient is not exist"
            })
        }
        resp.json({
            success:true,
            data:Patient
        })
    }
    catch(error){
        return resp.json({
            success:false,
            message:"Error in api",
            error:error
        })
    }
}

//login Nurse


const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}


const loginNurse = async (req, resp) => {
    const { Email, password } = req.body;

    try {
        const nurse = await NurseModel.findOne({ Email });
        if (!nurse) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Email",
            });
        }

    
        if (nurse.password!= password) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Password",
            });
        }

        const token = createToken(nurse._id);
        return resp.json({      // <<< Also return here (good habit)
            success: true,
            message: "Login Successfully",
            data: nurse,
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
export { addNurse, AllNurses,FindNurse,personlDetail,loginNurse };