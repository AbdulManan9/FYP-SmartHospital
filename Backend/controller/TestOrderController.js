import testModel from "../models/TestTemplateModel.js";
import testOrder from "../models/TestOrderModel.js";

// Doctor assighn test to patient
const assighnTest = async (req, resp) => {
  try {
    const { Testname, patient_id } = req.body;
    console.log("Test is");
    console.log(Testname);
    if (!Testname) {
      return resp.json({
        success: false,
        message: "Please first select test",
      })
    }
    const test = await testModel.findOne({ Testname });
    if (!test) {
      return resp.json({
        success: false,
        message: "This test is not exist"
      })
    }
    const findassighnTest = await testOrder.findOne({ testTemplate_id: test._id, patient_id: patient_id });
    if (findassighnTest && findassighnTest.status == "pending") {
      return resp.json({
        success: false,
        message: "Test is already assighn to patient",
      })
    }
    const assighnTest = new testOrder({
      patient_id: req.body.patient_id,
      doctor_id: req.body.doctor_id,
      testTemplate_id: test._id,
    })
    await assighnTest.save();
    return resp.json({
      success: true,
      message: "Test assighn to pateint"
    })

  }
  catch (error) {
    console.log(error)
    return resp.json({
      success: false,
      message: "Error in api",
      error: error
    })
  }
}

// List of Pending test Api
const PendingTests = async (req, resp) => {
  try {
    const pendingTests = await testOrder.find({ status: "pending" }).populate('patient_id').populate('doctor_id').populate('testTemplate_id');

    if (pendingTests.length === 0) {
      return resp.json({
        success: true,
        message: "No pending tests found",

      });
    }

    return resp.json({
      success: true,
      message: "Pending tests fetched successfully",
      data: pendingTests
    });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({
      success: false,
      message: "Error fetching pending tests",
      error: error.message
    });
  }
};


const testResult = async (req, resp) => {
  try {
    const { testOrderId, result } = req.body;
    const order = await testOrder.findById(testOrderId);
    console.log("Order is");
    console.log(order);
    if (!order && order.status == 'pending') {
      return resp.json({
        success: false,
        message: "There is no test assighn by any doctor",
      })
    }
    const template = await testModel.findById(order.testTemplate_id);
    if (!template) {
      return resp.json({
        success: false,
        message: "This test is not exist in hospital lab"
      })
    }

    const validatedResult = result.map(input => {
      const templateField = template.fields.find(f => f.name === input.name);

      if (!templateField) {
        throw new Error(`Field "${input.name}" not found in template`);
      }

      const isAbnormal = input.value < templateField.normalMin || input.value > templateField.normalMax;
      return { ...input, isAbnormal };
    });


    order.result = validatedResult;
    order.status = 'completed';
    order.createdAt = Date.now();
    await order.save();
    resp.json({
      success: true,
      message: "Test Result add"
    })
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

//docor get patien tests List

const PatientTests=async(req,resp)=>{
  try{
    const patient_id=req.params.patient_id;
    const TestList=await testOrder.find({patient_id:patient_id}).populate('testTemplate_id').populate('patient_id').populate('doctor_id');
    if(TestList.length<0){
      return resp.json({
        success:false,
        message:"This patient have no test exist",
      })
    }
    return resp.json({
      success:true,
      message:"Test List",
      data:TestList
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

export { assighnTest, PendingTests, testResult,PatientTests }