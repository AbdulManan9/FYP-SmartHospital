import mongoose from "mongoose";

const WardSchema=new mongoose.Schema({
    wardName:{type:String},
    wardNumber:{type:String},
    Department:{type:String},
})

const WardModel=mongoose.model.Ward || mongoose.model("Ward",WardSchema);
export default WardModel;