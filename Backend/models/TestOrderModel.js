import mongoose, { Types } from 'mongoose'

const resultFieldSchema = new mongoose.Schema({
  name: String,
  value: Number,
  unit: String,
  isAbnormal: Boolean
});


const testOrderSchema=new mongoose.Schema({
    patient_id:{type:mongoose.Schema.Types.ObjectId,ref:"Patient"},
    doctor_id:{type:mongoose.Schema.Types.ObjectId,ref:"Doctor"},
    testTemplate_id:{type:mongoose.Schema.Types.ObjectId,ref:"Test"},
    status:{type:String,enum: ['pending', 'completed'], default: 'pending'},
    assighnedAt:{type:Date,default:Date.now},
    result:[resultFieldSchema],
    createdAt:{type:Date}

})

const testOrder=mongoose.model.TestOrder||mongoose.model("TestOrder",testOrderSchema);
export default testOrder;