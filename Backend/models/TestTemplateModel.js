import mongoose from 'mongoose'

const fieldSchema=new mongoose.Schema({
    name:{type:String},
    unit:{type:String},
    normalMin:{type:Number},
    normalMax:{type:Number},
})

const testTemplateSchema=new mongoose.Schema({
    Testname:{type:String},
    description:{type:String},
    fields:[fieldSchema]
})

const testModel= mongoose.model.Test||mongoose.model("Test",testTemplateSchema);
export default testModel;
