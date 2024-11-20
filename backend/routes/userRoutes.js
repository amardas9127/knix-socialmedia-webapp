const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Search users by name
router.get("/search-users", async (req, res) => {
  const { query } = req.query;
  if (!query || query.trim() === "") {
    return res.status(400).send({ error: "Query parameter is required" });
  }

  try {
    const users = await User.find(
      { name: { $regex: query, $options: "i" } },
      { name: 1, _id: 1, friends: 1 }
    );
    res.status(200).send(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send({ error: "Error fetching users" });
  }
});

module.exports = router;
