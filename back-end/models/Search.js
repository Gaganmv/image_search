const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  email: { type: String, required: true },           // Who made the search
  query: { type: String, required: true },           // Search term
  timestamp: { type: Date, default: Date.now }       // When it was made
});

module.exports = mongoose.model("Search", searchSchema);