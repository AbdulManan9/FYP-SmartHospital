import WardModel from "../../models/WardModels/WardModel.js";
import RoomModule from "../../models/WardModels/RoomModel.js";
import bedModel from "../../models/WardModels/BedModel.js";
import AdmissionRecordModel from "../../models/AdmitRecordModel.js";
import PatientModel from "../../models/PatientModel.js";
const AddWard=async(req,resp)=>{
    const{wardNumber}=req.body;
    try{
        const ward=WardModel.findOne({wardNumber});
        if (ward) {
            return resp.json({
                success: false,
                message: "This ward Number is already exist",
            });
        }
        const newWard=new WardModel({
            wardName:req.body.wardName,
            wardNumber:req.body.wardNumber,
            Department:req.body.Department,
        })
        await newWard.save();
        resp.json({
            success:"true",
            message:"Ward Added Sucessfully",
        })
        console.log(newWard);
    }
    catch(error){
        resp.json({
            success:"false",
            message:"Ward not Added Successfully",
        })
        console.log(error);
    }
}

const ListWard=async(req,resp)=>{
try{
    const findWard=await WardModel.find()
    resp.json({
        success:true,
        message:"List of Ward",
        data:findWard
    })
    console.log(findWard);
}
catch(error){
    resp.status(500).json({
        success: false,
        message: "Failed to Get Ward List",
        error: error.message,
    });
    console.log(error);
}
}

// Search Ward
const SearchWard = async (req, resp) => {
    try {
        const wardNumber = req.params.id; // Extract ward ID from route params

        // Find ward by ID
        const ward = await WardModel.findOne({ wardNumber });

        if (ward) {
            resp.json({
                success: true,
                message: "Ward found successfully",
                data: ward // Include ward details in response
            });
            console.log(ward);
        } else {
            resp.json({
                success: false,
                message: "ward not found",
            });
        }
    } catch (error) {
        resp.json({
            success: false,
            message: "Failed to find ward",
            error: error.message, // Include error details for debugging
        });
        console.error(error);
    }
};


// api to find total bed that is available in ward 
const getavailableBeds=async(req,resp)=>{
    const { ward_id } = req.params;

    try{
        const ward = await WardModel.findById(ward_id);
        console.log("ward is");
        console.log(ward);
        const rooms=await RoomModule.find({ward:ward_id});
        const roomIds = rooms.map(room => room._id);
        const availableBeds=await bedModel.find({
            room_id:{ $in: roomIds },
            bed_status:'available'
        })
        return resp.json({
            success:true,
            total:availableBeds.length,
            wardName:ward.wardName
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


//List of patient that is admit in ward

const admitPatientInWard=async(req,resp)=>{
    try{
        const {dutyWard}=req.params;
        console.log("Ward");
        console.log(dutyWard)
        const status="Admit";
        const Patients=await AdmissionRecordModel.find({ward_id:dutyWard,status:status}).populate('patient_id').populate('doctor_id').populate('ward_id').populate('bed_id').populate('room_id');
        if(Patients.length==0){
            return resp.json({
                success:false,
                message:"There is no patient admit in assighn ward"
            })
        }
        return resp.json({
            success:true,
            data:Patients,
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

//find admited patient in ward
const findPatient=async(req,resp)=>{
    try{
        const {cnic}=req.body;
        const Patient=await PatientModel.findOne({cnic});
        if(!Patient){
            resp.json({
                success:false,
                message:"Enter correct cnic"
            })
        }
        console.log(Patient);
        const status="Admit";
        const admit=await AdmissionRecordModel.findOne({patient_id:Patient._id,status:status}).populate('patient_id').populate('doctor_id').populate('ward_id').populate('bed_id').populate('room_id');
        if(!admit){
            return resp.json({
                success:false,
                message:"This patient is not admit in ward",
            })
        }
        return resp.json({
            success:true,
            message:"Admit Pateitn",
            data:admit
        })
    }
    catch(error){

    }
}

export {AddWard,ListWard,SearchWard,getavailableBeds,admitPatientInWard,findPatient};