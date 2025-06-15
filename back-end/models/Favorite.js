const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  email: String,
  imageId: String,
  imageUrl: String,
  label: String,
});

module.exports = mongoose.model("Favorite", favoriteSchema);
