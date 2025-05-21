import AdmissionRecordModel from "../models/AdmitRecordModel.js";
import wardAdminModel from "../models/WardAdminModel.js";
import WardModel from "../models/WardModels/WardModel.js";
import RoomModule from "../models/WardModels/RoomModel.js";
import bcrypt from "bcrypt"; // Make sure to import bcrypt
import bedModel from "../models/WardModels/BedModel.js";
import PatientModel from "../models/PatientModel.js";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
// add ward Admin api


const addWardAdmin = async (req, resp) => {
    try {
        const { name, Email, phone, password, cnic, wardNumber } = req.body;

        // Check if Ward Admin already exists (await is missing in your code)
        const wardAdmin = await wardAdminModel.findOne({ cnic });
        if (wardAdmin) {
            return resp.json({
                success: false,
                message: "The Ward Admin already exists",
            });
        }

        const dutyWard = await WardModel.findOne({ wardNumber });
        if (!dutyWard) {
            return resp.status(400).json({
                success: false,
                message: "Invalid ward number. Please enter a valid ward where the nurse will take duty."
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newWardAdmin = new wardAdminModel({
            name,
            Email,
            phone,
            password: hashedPassword, // Store hashed password
            cnic,
            dutyWard: dutyWard._id,
        });

        await newWardAdmin.save();

        return resp.json({
            success: true,
            message: "The Ward Admin was added successfully",
        });
    } catch (error) {
        console.error("Error in API:", error);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


// api to find List of Ward Admin

const ListWardAdmin = async (req, resp) => {
    try {
        const ListWardAdmin = await wardAdminModel.find().populate("dutyWard");
        if (wardAdminModel.length > 0) {
            return resp.json({
                success: true,
                message: "List of ward Admin",
                data: ListWardAdmin,
            })
        }
        else {
            return resp.json({
                success: false,
                message: "There is no ward Admin exist",
            })
        }
    }
    catch (error) {
        console.log("Error in api");
        console.log(error);
    }
}


// Api to find list of patient waiting for admission
const AdmitList = async (req, resp) => {
    try {
        const { wardAdmin_id } = req.body;
        const WardAdmin = await wardAdminModel.findById(wardAdmin_id);

        if (!WardAdmin) {
            return resp.json({
                success: false,
                message: "Ward admin not found",
            });
        }

        const dutyward = WardAdmin.dutyWard;
        const status = "Pending";

        const patientList = await AdmissionRecordModel.find({ ward_id: dutyward, status }).populate('patient_id').populate('doctor_id').populate('ward_id');

        return resp.json({
            success: true,
            message: "List of patients pending bed/room assignment",
            data: patientList,
            total: patientList.length
        });

    } catch (error) {
        console.log(error);
        return resp.json({
            success: false,
            message: "Error in API",
            error: error.message,
        });
    }
};


// total patient admit in ward

const AdmitedList = async (req, resp) => {
    try {
        const { wardAdmin_id } = req.body;
        const WardAdmin = await wardAdminModel.findById(wardAdmin_id);

        if (!WardAdmin) {
            return resp.json({
                success: false,
                message: "Ward admin not found",
            });
        }

        const dutyward = WardAdmin.dutyWard;
        const status = "Admit";

        const patientList = await AdmissionRecordModel.find({ ward_id: dutyward, status }).populate('patient_id').populate('doctor_id').populate('bed_id').populate('room_id');

        return resp.json({
            success: true,
            message: "List of patients admit in ward",
            data: patientList,
            total: patientList.length
        });


    }
    catch (error) {
        console.log(error);
        resp.json({
            success: false,
            message: "Error in api",
        })
    }
}


//Find rooms in ward

const ListRoom = async (req, resp) => {
    try {
        const { wardAdmin_id } = req.body;
        const WardAdmin = await wardAdminModel.findById(wardAdmin_id);

        if (!WardAdmin) {
            return resp.json({
                success: false,
                message: "Ward admin not found",
            });
        }

        const dutyward = WardAdmin.dutyWard;
        const ListRoom=await RoomModule.find({ward:dutyward});
        if(ListRoom.length>0){
            return resp.json({
                success:true,
                message:"Room List find",
                data:ListRoom
            })
        }else{
            return resp.json({
                success:false,
                message:"There is no room exist in ward"
            })
        }
    }
    catch (error) {
        console.log("Error in api");
        console.log(error);
    }
}

// admit panding admission patient

const admitPendingPatient=async(req,resp)=>{
    try{
        const {room_id,bed_id,patient_id}=req.body;
        const admitStatus=await AdmissionRecordModel.findOne({patient_id});
        const Patient=await PatientModel.findById(patient_id);
        console.log(admitStatus);
        if (!bed_id || !mongoose.Types.ObjectId.isValid(bed_id)) {
            return resp.json({
                success: false,
                message: "Invalid or missing bed ID",
            });
        }
        if (!patient_id || !mongoose.Types.ObjectId.isValid(patient_id)) {
            return resp.json({
                success: false,
                message: "Invalid or missing patient ID",
            });
        }
                
        if(!Patient){
            return resp.json({
                success:false,
                message:"There is no patient exist",
            })
        }
        if(admitStatus.status!="Pending"){
            return resp.json({
                success:false,
                message:"You are not able to admit the patient",
            })
        }
        const bedStatus = await bedModel.findById(bed_id);
        console.log(bedStatus);
        if(bedStatus.bed_status!="available"){
            return resp.json({
                success:false,
                message:"Bed is already booked",
            })
        }
        admitStatus.room_id=room_id;
        admitStatus.bed_id=bed_id;
        admitStatus.admissionDate = new Date().toISOString().split('T')[0];
        admitStatus.status="Admit";
        await admitStatus.save();
        bedStatus.bed_status="Booked";
        await bedStatus.save();
        Patient.status="Admit";
        await Patient.save();
        return resp.json({
            success:true,
            message:"Patient has been admit successfully"
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

// login ward Admin

const createToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET)
}
const loginWardAdmin = async (req, resp) => {
    const { Email, password } = req.body;

    try {
        const wardAdmin = await wardAdminModel.findOne({ Email });
        if (!wardAdmin) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Email",
            });
        }

        const isMatch = await bcrypt.compare(password, wardAdmin.password);
        if (!isMatch) {
            return resp.json({   // <<< RETURN added
                success: false,
                message: "Please Enter correct Password",
            });
        }

        const token = createToken(wardAdmin._id);
        return resp.json({      // <<< Also return here (good habit)
            success: true,
            message: "Login Successfully",
            data: wardAdmin,
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
export { addWardAdmin, ListWardAdmin, AdmitList, AdmitedList,ListRoom,admitPendingPatient,loginWardAdmin };
