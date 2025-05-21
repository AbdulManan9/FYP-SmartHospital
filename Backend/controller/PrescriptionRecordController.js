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
        const Prescription=await PrescriptionModel.find({medicalRecord_id}).populate("doctor_id", "doctorName") ;
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

// Api that is used to delete Prescription
const DeletePrescription = async (req, resp) => {
    try {
        const { id } = req.params;

        // ❌ WRONG: deleteById → ❌ Not a valid Mongoose method
        // ✅ CORRECT: Use findByIdAndDelete
        const deletePres = await PrescriptionModel.findByIdAndDelete(id);

        if (!deletePres) {
            return resp.json({
                success: false,
                message: "Prescription not found or already deleted",
            });
        }

        return resp.json({
            success: true,
            message: "Prescription deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


export {addPrescription,PrescriptionRecord,DeletePrescription}