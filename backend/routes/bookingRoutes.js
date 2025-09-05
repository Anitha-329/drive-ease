const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  getSingleBooking,
  assignDriver,
} = require("../controllers/bookingController");

// All routes using POST method
router.get("/get-all", getAllBookings);
router.post("/get-single", getSingleBooking);
router.post("/assign-driver", assignDriver);
router.post("/assign-driver", assignDriver);

module.exports = router;
