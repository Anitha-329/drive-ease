const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
    query: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Query = mongoose.model("Query", querySchema);
module.exports = Query;
