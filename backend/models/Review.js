const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
  for: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  review:{
    type:String
  },
  rating:{
    type:String
  }
},{
    timestamps:true
});

const Review = mongoose.model("Review" , reviewSchema)
module.exports = Review