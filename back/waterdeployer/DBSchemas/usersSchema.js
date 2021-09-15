import mongoose from "mongoose";


const newUser=mongoose.Schema({
    name:String,
    email:String,
    password:String
});


export default mongoose.model("users",newUser);

