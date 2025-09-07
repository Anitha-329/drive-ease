const Booking = require("../models/Booking");
const Driver = require("../models/Driver");
// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user").populate("driver");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Get single booking
exports.getSingleBooking = async (req, res) => {
  try {
    const { bookingId } = req.body; // taking id from POST body
    const booking = await Booking.findById(bookingId)
      .populate("user")
      .populate("driver");

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Assign driver
exports.assignDriver = async (req, res) => {
  try {
    const { bookingId, driverId } = req.body;

    // Check if driver exists
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    // Check if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update the booking with driver assignment
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { driver: driverId },
      { new: true }
    )
      .populate("user")
      .populate("driver");

    // Add the booking to the driver's bookings array
    await Driver.findByIdAndUpdate(
      driverId,
      { $push: { bookings: bookingId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Driver assigned successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error assigning driver:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.addPrice = async()=>{
  try {
    const {id , price} = req.body
    const booking = await Booking.findById(id)
    booking.price = price
    await booking.save();
  } catch (error) {
    console.error("Error assigning driver:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
}
