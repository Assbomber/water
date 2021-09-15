

import mongoose from 'mongoose';

const slotSchema=mongoose.Schema({
    date:String,
    slots:[Number]
})

export default mongoose.model("slots",slotSchema);