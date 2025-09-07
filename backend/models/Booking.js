const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    withCar:{
      type:Boolean,
      default:true
    },
    carType: {
      type: String,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    price: {
      type: String,
    },
    distance: {
      type: String,
    },
    dateTime: {
      type: String,
    },
    started: {
      type: Boolean,
      default: false,
    },
    ended: {
      type: Boolean,
      default: false,
    },
    timeTaken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
