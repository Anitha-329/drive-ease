const mongoose = require("mongoose")

const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    bookings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking"
        }
    ],
    queries:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Query"
        }
    ],
   
},{
    timestamps:true
})

const Owner = mongoose.model("Owner" , ownerSchema);
module.exports = Owner