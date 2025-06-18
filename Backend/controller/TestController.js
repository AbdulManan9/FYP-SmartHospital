
import PatientModel from "../models/PatientModel.js";
import testOrder from "../models/TestOrderModel.js";
import testModel from "../models/TestTemplateModel.js";

// api that is used to add test

const addTest = async (req, resp) => {
    const { Testname, description } = req.body;
    try {
        const test = await testModel.findOne({ Testname });
        if (test) {
            return resp.json({
                success: false,
                message: "Test already exist",
            })
        }
        const newTest = new testModel({
            Testname,
            description,
            fields: [],
        })
        await newTest.save();
        resp.json({
            success: true,
            message: "Test added sucessfully",
        })
    }
    catch (error) {
        console.log(error);
        resp.json({
            success: false,
            message: "Error in api",
            error: error
        })
    }
}


// add field in test

const addField = async (req, resp) => {
    const template = await testModel.findById(req.params.id);
    try {
        if (!template) {
            return resp.status(404).json({ message: "Template not found" });
        }

        template.fields.push(req.body);
        await template.save();

        return resp.json({
            success:true,
            message:"Test Field added",
        });
    }
    catch (error) {
        console.log(error);
        return resp.json({
            success: false,
            message: "Error in api",
            error: error
        })
    }
}

const listField=async(req,resp)=>{
    const test_id=req.params.id;
    try{
        const test=await testModel.findById(test_id);
        if(!test){
            resp.json({
                success:false,
                message:"There is no test exist"
            })
        }
        resp.json({
            success:true,
            data:test.fields
        })
    }
    catch(error){
        console.log(error);
        resp.json({
            success:false,
            message:"Error in api",
            error:error
        })
    }
}

const ListTest=async (req,resp)=>{
    try{
        const ListTest=await testModel.find();
        if(ListTest.length>0){
            return resp.json({
                success:true,
                message:"List of test",
                data:ListTest
            })
        }
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

// Api that is used Patient find test record

const PatienttestRec = async (req, resp) => {
    const { cnic } = req.params;
    try {
        const Patient=await PatientModel.findOne({cnic});
        if(!Patient){
            return resp.json({
                success:false,
                message:"The pateint is not exist with this cnic"
            })
        }
        const test=await testOrder.findOne({patient_id:Patient._id}).populate('patient_id').populate('doctor_id').populate('testTemplate_id');
        if(!test){
            return resp.json({
                success:false,
                message:"This patient is no test record"
            })
        }
        console.log(test);
        return resp.json({
            success:true,
            data:test
        })
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            success: false,
            message: "Error in API",
            error: error.message
        });
    }
};


export { addTest,addField,ListTest,listField,PatienttestRec }