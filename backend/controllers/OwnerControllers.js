const Owner = require("../models/Owner");
const Booking = require("../models/Booking");
const Query = require("../models/Queries");

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    // Create new owner
    const owner = new Owner({
      name,
      email,
      password, // Note: In production, you should hash the password
    });

    await owner.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      owner: {
        _id: owner._id,
        name: owner.name,
        email: owner.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password (without hashing for simplicity)
    if (owner.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      owner: {
        _id: owner._id,
        name: owner.name,
        email: owner.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single user by ID
exports.getSingleUser = async (req, res) => {
  try {

    const { id } = req.body;
    console.log(req.body)

    const owner = await Owner.findById(id)
      .populate("bookings")
      .populate("queries");

    if (!owner) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      owner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const owners = await Owner.find().populate("bookings").populate("queries");

    res.status(200).json({
      success: true,
      count: owners.length,
      owners,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add booking to user
exports.addBooking = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookingData = req.body;

    // Find the user
    const owner = await Owner.findById(userId);
    if (!owner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new booking
    const booking = new Booking(bookingData);
    await booking.save();

    // Add booking to user's bookings array
    owner.bookings.push(booking._id);
    await owner.save();

    // Populate the response
    await owner.populate("bookings");

    res.status(201).json({
      success: true,
      message: "Booking added successfully",
      owner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add query to user
exports.addQuery = async (req, res) => {
  try {
    const { userId } = req.body;
    const queryData = req.body;

    // Find the user
    const owner = await Owner.findById(userId);
    if (!owner) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create new query
    const query = new Query(queryData);
    await query.save();

    // Add query to user's queries array
    owner.queries.push(query._id);
    await owner.save();

    // Populate the response
    await owner.populate("queries");

    res.status(201).json({
      success: true,
      message: "Query added successfully",
      owner,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.createQuery = async (req, res) => {
  try {
    const { userId, queryText } = req.body;

    // Validate input
    if (!userId || !queryText) {
      return res.status(400).json({
        success: false,
        message: "User ID and query text are required",
      });
    }

    // Check if user exists
    const user = await Owner.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create new query
    const newQuery = new Query({
      by: userId,
      query: queryText,
    });

    // Save query
    const savedQuery = await newQuery.save();

    // Add query to user's queries array
    user.queries.push(savedQuery._id);
    await user.save();

    // Populate the query with user details before sending response
    await savedQuery.populate("by", "name email");

    res.status(201).json({
      success: true,
      message: "Query created successfully",
      query: savedQuery,
    });
  } catch (error) {
    console.error("Error creating query:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.deleteQuery = async (req, res) => {
  try {
    const { queryId, userId } = req.body;

    // Validate input
    if (!queryId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Query ID and User ID are required",
      });
    }

    // Find the query
    const query = await Query.findById(queryId);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    // Check if the user owns this query
    if (query.by.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own queries",
      });
    }

    // Remove query from database
    await Query.findByIdAndDelete(queryId);

    // Remove query reference from user's queries array
    await Owner.findByIdAndUpdate(userId, { $pull: { queries: queryId } });

    res.status(200).json({
      success: true,
      message: "Query deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting query:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllQueries = async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Check if user exists
    const user = await Owner.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get all queries for the user and populate user details
    const queries = await Query.find({ by: userId })
      .populate("by", "name email")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      success: true,
      count: queries.length,
      queries,
    });
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.allQueries = async(req,res)=>{
  try {
    const queries = await Query.find()
    return res.status(200).send(queries)
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
