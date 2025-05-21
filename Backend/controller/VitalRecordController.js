import VitalRecordModel from "../models/VitalRecordModel.js";

const addVital = async (req, resp) => {
    const { patient_id, nurse_id, bloodPressure, oxygenLevel, sugarLevel, pulseRate } = req.body;
    try {
        const vital = new VitalRecordModel({
            patient_id,
            nurse_id,
            bloodPressure,
            oxygenLevel,
            sugarLevel,
            pulseRate,
        });
        await vital.save();
        resp.json({
            success: true,
            message: "Vital Record Added",
        })
    }
    catch (error) {
        console.log(error);
        resp.json({
            success: false,
            message: "Error in api"
        })
    }
}


const getVital = async (req, resp) => {
    const { patient_id, date } = req.body;
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    try {
        const vitalRecords=await VitalRecordModel.find({
            patient_id:patient_id,
            createdAt:{ $gte: start, $lte: end },
        })
        if(vitalRecords.length>0){
            resp.json({
                success:true,
                data:vitalRecords,
            })
        }
        else{
            resp.json({
                success:false,
                message:"There is no vital record exist",
            })
        }
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


export { addVital,getVital }