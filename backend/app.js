require("dotenv").config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const driverRoutes = require("./routes/driverRoutes");
const userRoutes = require("./routes/ownerRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const connectDB = require("./config/db");

connectDB()
// Create Express app
const app = express();

app.use(cors()); // Enable CORS for all routes

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.use("/driver" , driverRoutes)
app.use("/user", userRoutes);
app.use("/booking", bookingRoutes);



// Set port and start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
