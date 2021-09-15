import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    email:String,
    date:String,
    slots:[Number],
})

export default mongoose.model("orders",orderSchema);