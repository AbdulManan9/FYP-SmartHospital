import MedicalRecordModel from "../models/MedicalRecordModel.js"

// add Medical Record

const addMedicalRecord=async(req,resp)=>{
    const {dignosis,treatmentPlan,History}=req.body;
    if (!dignosis || !treatmentPlan || !History) {
        return resp.json({
            success: false,
            message: "Please enter complete medical details.",
        });
    }
    
    try{
        const newDector=new MedicalRecordModel({
            doctor_id:req.body.doctor_id,
            patient_id:req.body.patient_id,
            dignosis:dignosis,
            treatmentPlan:treatmentPlan,
            History:History,
        })
    
        await newDector.save();
        resp.json({
            success:true,
            message:"Medical Record added Sucessfully",
            data:newDector,
        })
    }
    catch(error){
        resp.json({
            success:false,
            message:"Error in Api",
            error:error,
        })
    }

}

// Find list of Medical Record

const FindPatientRecord=async(req,resp)=>{
    try{
        const { patient_id } = req.params; 
        console.log(patient_id);
        const MedicalRecord=await MedicalRecordModel.find({patient_id})
        console.log(MedicalRecord);
        if(MedicalRecord.length>0){
            resp.json({
                success:true,
                message:"List of Medical Record",
                data:MedicalRecord,
            })
        }
        else{
            resp.json({
                success:false,
                message:"There is no medical Record exist",
            })
        }
    }
    catch(error){
        resp.json({
            success:false,
            message:"Error in api",
            error:error
        })
    }
}

export {addMedicalRecord,FindPatientRecord};