const Booking = require("../models/Booking")
const Driver = require("../models/Driver");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      license,
      adhar,
      carName,
      carType,
      profilePhoto,
      numberPlate,
      withCar,
    } = req.body;

    // Check if driver already exists
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ error: "Driver already exists" });
    }

    // Create new driver
    const newDriver = await Driver.create({
      name,
      email,
      password,
      license,
      adhar,
      carName,
      carType,
      profilePhoto,
      numberPlate,
      withCar,
    });

    res.status(201).json({
      success: true,
      driver: newDriver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find driver by email
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Check password (plain text comparison - for simplicity)
    if (driver.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Driver by ID
exports.getSingleDriver = async (req, res) => {
  try {
    const { id } = req.body;

    const driver = await Driver.findById(id)
      .populate("bookings") // Populate the bookings array
      .populate("earning.booking"); // Populate the booking references inside earning array

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getALLDrivers = async(req,res)=>{
  try {
    const drivers = await Driver.find()
    return res.status(200).json(drivers)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.verfiyDriver = async(req,res)=>{
  try {
    const {id , verification} = req.body
    const driver = await Driver.findById(id)
    driver.verfied = verification
    await driver.save();
    return res.status(200).json(driver)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Start a ride
exports.startRide = async (req, res) => {
  try {
    const { bookingId, driverId } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the driver is assigned to this booking
    if (booking.driver.toString() !== driverId) {
      return res
        .status(403)
        .json({ message: "Driver not assigned to this booking" });
    }

    // Check if ride is already started
    if (booking.started) {
      return res.status(400).json({ message: "Ride already started" });
    }

    // Update booking to mark as started
    booking.started = true;
    await booking.save();

    res.status(200).json({
      message: "Ride started successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// End a ride and calculate earnings
exports.endRide = async (req, res) => {
  try {
    const { bookingId, driverId, timeTaken } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the driver is assigned to this booking
    if (booking.driver.toString() !== driverId) {
      return res
        .status(403)
        .json({ message: "Driver not assigned to this booking" });
    }

    // Check if ride is already ended
    if (booking.ended) {
      return res.status(400).json({ message: "Ride already ended" });
    }

    // Check if ride was started
    if (!booking.started) {
      return res.status(400).json({ message: "Ride not started yet" });
    }

    // Calculate driver's earnings (60% of total price)
    const totalPrice = parseFloat(booking.price);
    const driverEarnings = (totalPrice * 0.6).toFixed(2);

    // Update booking to mark as ended and add time taken
    booking.ended = true;
    booking.timeTaken = timeTaken;
    await booking.save();

    // Find the driver and update earnings
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Add the booking to driver's bookings array if not already there
    if (!driver.bookings.includes(bookingId)) {
      driver.bookings.push(bookingId);
    }

    // Add to earnings array
    driver.earning.push({
      booking: bookingId,
      earned: driverEarnings,
    });

    await driver.save();

    res.status(200).json({
      message: "Ride ended successfully",
      booking,
      earnings: driverEarnings,
      totalPrice: booking.price,
      distance: booking.distance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get driver's total earnings
exports.getDriverEarnings = async (req, res) => {
  try {
    const { driverId } = req.body;

    const driver = await Driver.findById(driverId).populate("earning.booking");
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Calculate total earnings
    const totalEarnings = driver.earning.reduce((total, earning) => {
      return total + parseFloat(earning.earned);
    }, 0);

    res.status(200).json({
      driver: driver.name,
      totalEarnings: totalEarnings.toFixed(2),
      totalRides: driver.bookings.length,
      earningsBreakdown: driver.earning,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get specific booking details with earnings
exports.getBookingDetails = async (req, res) => {
  try {
    const { bookingId, driverId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the driver is assigned to this booking
    if (booking.driver.toString() !== driverId) {
      return res
        .status(403)
        .json({ message: "Driver not assigned to this booking" });
    }

    // Find driver to get specific earning for this booking
    const driver = await Driver.findById(driverId);
    const bookingEarning = driver.earning.find(
      (earn) => earn.booking.toString() === bookingId
    );

    res.status(200).json({
      booking,
      driverEarnings: bookingEarning ? bookingEarning.earned : "0.00",
      driverPercentage: "60%",
      totalPrice: booking.price,
      distance: booking.distance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};