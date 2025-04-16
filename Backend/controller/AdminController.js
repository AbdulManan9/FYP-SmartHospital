import adminModel from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
const addAdmin=async(req,resp)=>{
    try{
        const newAdmin= new adminModel({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        })
        await newAdmin.save();
        resp.json({
            message:"Admin added Sucessfuly"
        })
    }
    catch(error){
        resp.json(error);
    }
}
const updatePassword = async (req, resp) => {
    try {
        const adminUser = await adminModel.findOne(); // Get single admin document

        if (!adminUser) {
            console.log("No admin found.");
            return resp.status(404).json({ message: "Admin not found" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(adminUser.password, salt);

        adminUser.password = hashpassword; // Update password field
        await adminUser.save(); // Save updated document

        resp.json({
            message: "Successfully updated password",
            data: adminUser,
        });
    } catch (error) {
        console.log("The error is:", error);
        resp.status(500).json({ message: "Internal Server Error" });
    }
};

const loginAdmin = async (req, resp) => {
    try {
        const { username, password } = req.body;

        // Find the admin with the given username
        const adminUser = await adminModel.findOne({ username });

        if (!adminUser) {
            return resp.json({
                success: false,
                message: "Enter correct username",
            });
        }

        // Compare hashed password with entered password
        const isPasswordMatch = await bcrypt.compare(password, adminUser.password);

        if (isPasswordMatch) {
            const token= createToken(adminUser._id);
            return resp.json({
                success: true,
                message: "Login Successfully",
                token
            });
        } else {
            return resp.json({
                success: false,
                message: "Enter correct password",
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        resp.status(500).json({
            success: false,
            message: "Login not successful",
            error: error.message,
        });
    }
};

const forgetPassword = async (req, resp) => {
    try {
        const { email } = req.body;
        const user = await adminModel.findOne({ email: email });

        if (!user) {
            return resp.json({
                message: "Enter correct Email",
                success: false,
            });
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, "jwt_secret_key", { expiresIn: "1d" });

        // Configure Nodemailer
        var transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port:465,
            auth: {
                user: "youremail@gmail.com", // Replace with your email
                pass: "your-app-password",  // Replace with the App Password
            },
        });

        var mailOptions = {
            from: "youremail@gmail.com",
            to: email,
            subject: "Reset your Password",
            text: `Click the link to reset your password: http://localhost:5173/reset-password/${user._id}/${token}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        
        return resp.json({
            success: true,
            message: "Password reset email sent successfully",
        });
    } catch (error) {
        console.error("Error:", error);
        return resp.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export  { updatePassword , addAdmin ,loginAdmin, forgetPassword};