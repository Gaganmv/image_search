const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");

// Add a favorite
router.post("/", async (req, res) => {
  const { email, imageId, imageUrl, label } = req.body;
  try {
    const newFav = new Favorite({ email, imageId, imageUrl, label });
    await newFav.save();
    res.status(201).json({ message: "Favorite saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save favorite" });
  }
});

// Get all favorites for a user
router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const favs = await Favorite.find({ email });
    res.json(favs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

module.exports = router;
