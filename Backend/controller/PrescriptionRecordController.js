import PrescriptionModel from "../models/PrescriptionModel.js";

// add Prescription record

const addPrescription=async(req,resp)=>{
    try{
        const{medicalRecord_id,doctor_id,prescriptionDate,medicineName,dosage,frequency,duration,instruction}=req.body;
        const newPrescription=new PrescriptionModel({
            medicalRecord_id,
            doctor_id,
            prescriptionDate,
            medicineName,
            dosage,
            frequency,
            duration,
            instruction,
        })
        await newPrescription.save();
        resp.json({
            success:true,
            message:"Prescription record added sucessfully",
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

// find Prescription 

const PrescriptionRecord=async(req,resp)=>{
    try{
        const {medicalRecord_id}=req.params;
        const Prescription=await PrescriptionModel.find({medicalRecord_id});
        if(Prescription.length > 0)
            {
            resp.json({
                success:true,
                data:Prescription,
            })
        }
        else{
            resp.json({
                success:false,
                message:"There is no prescription record exist",
            })
        }
    }
    catch(error){
        resp.json({
            success:false,
            message:"Error in api",
            error:error,
        })
    }
}

export {addPrescription,PrescriptionRecord}