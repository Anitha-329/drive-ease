const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getSingleUser,
  getAllUsers,
  addBooking,
  addQuery,
  createQuery,
  deleteQuery,
  getAllQueries,
  allQueries,
} = require("../controllers/OwnerControllers");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// User routes
router.get("/allUsers", getAllUsers);
router.post("/getSingleUser", getSingleUser);

// Booking and query routes
router.post("/addBooking", addBooking);
router.post("/addQuery", addQuery);


//Query Routes
// Create a new query
router.post('/createQuery', createQuery);

// Delete a query
router.post('/deleteQuery', deleteQuery);


router.get("/allQuery", allQueries);

module.exports = router;
