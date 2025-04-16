import mongoose from "mongoose";

const connectDb=async ()=>{
    try{
        await mongoose.connect('mongodb+srv://abdulmanan:2003.Manan@cluster0.q0z2j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        
        console.log("connect to db sucessfully");
    }
    catch(error){
        console.log(error.message);
        console.log("Could not connect to mongodb Sucessfully");
        
    }
}

export default connectDb;