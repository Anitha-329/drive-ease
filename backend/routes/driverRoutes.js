const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getSingleDriver,
  getALLDrivers,
  verfiyDriver,
  getDriverEarnings,
  endRide,
  startRide,
} = require("../controllers/DriverController");

// POST /api/driver/signup
router.post("/signup", signup);

// POST /api/driver/login
router.post("/login", login);

// POST /api/driver/:id (Get single driver)
router.post("/getSingleDriver", getSingleDriver);

router.post("/verify", verfiyDriver);

router.get("/getALLDriver", getALLDrivers);


router.post("/start-ride", startRide);

// End a ride and calculate earnings
router.post("/end-ride", endRide);

// Get driver's total earnings
router.post("/earnings", getDriverEarnings);



module.exports = router;
