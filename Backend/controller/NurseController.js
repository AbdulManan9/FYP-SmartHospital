import NurseModel from "../models/NurseModel.js";


//add NurseDetail api
const addNurse=async(req,res)=>{
    try{
        const addNurse=new NurseModel({
            name:req.body.name,
            dob:req.body.dob,
            Gender:req.body.Gender,
            contactNo:req.body.contactNo,
            Department:req.body.Department,
            Designation:req.body.Designation,
            Shift:req.body.Shift
        })
        await addNurse.save();
        res.json({
            success: true,
            message: "Nurse details added successfully",
        });
        console.log("Nurse Details added Sucessfully");
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to add nurse details",
            error: error.message,
        });
        console.log("Nurse not added");
        console.log(error);
    }
}

// Nurses List Api

const AllNurses=async(req,resp)=>{
    try{
        const all_nurses=await NurseModel.find();
        resp.json({
            success: true,
            message: "All Nurses List display successfully",
            data:all_nurses
        })
        console.log(all_nurses)
        
    }
    catch(error){
        resp.json({
            success: false,
            message: "All Nurses list not display successfully",
        })
        console.log(error);
    }
}

export {addNurse,AllNurses};