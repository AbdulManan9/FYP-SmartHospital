import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import validateUser from "../Validation/UserValidation.js";
// Register user api

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
const registerUser=async(req,resp)=>{
    const {error}=validateUser(req.body);
    const {name,email,password}=req.body;

    try{
        if (error) {
            console.log(error);
            return resp.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const exist=await userModel.findOne({email});
        if(exist){
            return resp.json({
                success:false,
                message:"User already exist"
            })
        }
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({
            name:name,
            password:hashpassword,
            email:email
        })
        const user=await newUser.save();
        const token=createToken(user._id);
        return resp.json({
            success:true,
            token:token
        })

    }
    catch(error){
        console.log(error);
        return resp.json({
            success:false,
            message:"Error in api",
            error:error,
        })
    }
}

// Login User api

const loginUser=async(req,resp)=>{
    const{email,password}=req.body;
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return resp.json({
                success:false,
                message:"The user not exist",
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return resp.json({
                success:false,
                message:"Enter correct password",
            })
        }
        const token=createToken(user._id);
        return resp.json({
            success:true,
            message:"Login Successfully",
            token:token
        })
    }
    catch(error){
        console.log(error);
        return resp.json({
            success:false,
            message:"Error in api",
            error:error,
        })
    }
}

export {loginUser,registerUser}