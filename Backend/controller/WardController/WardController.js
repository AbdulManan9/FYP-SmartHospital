import WardModel from "../../models/WardModels/WardModel.js";

const AddWard=async(req,resp)=>{
    try{
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
        const wardId = req.params.id; // Extract ward ID from route params

        // Find ward by ID
        const ward = await WardModel.findOne({ _id: wardId });

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


export {AddWard,ListWard,SearchWard};