// const express = require("express");
// const router = express.Router();
// const Search = require("../models/Search");

// router.post("/", async (req, res) => {
//   const { email, query } = req.body;

//   try {
//     const newSearch = new Search({ email, query });
//     await newSearch.save();
//     res.status(201).json({ msg: "Search saved" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error saving search" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Search = require("../models/Search");

router.post("/", async (req, res) => {
  const { email, query, timestamp } = req.body;
  try {
    const newSearch = new Search({ email, query, timestamp });
    await newSearch.save();
    res.status(201).json({ message: "Search saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save search" });
  }
});

module.exports = router;
