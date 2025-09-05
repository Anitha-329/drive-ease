const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    withCar:{
      type:Boolean,
      default:true
    },
    license: {
      type: String,
    },
    adhar: {
      type: String,
    },
    carName: {
      type: String,
    },
    numberPlate: {
      type: String,
    },
    carType: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    earning: [
      {
        booking: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Booking",
        },
        earned: {
          type: String,
        },
      },
    ],
    verfied: {
      type: Boolean,
      default: false,
    },
    reviews:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Driver = mongoose.model("Driver" , driverSchema)
module.exports = Driver
