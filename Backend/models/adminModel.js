import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    "username":{type:String},
    "email":{type:String},
    "password":{type:String},
})
const adminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema);


export default adminModel;