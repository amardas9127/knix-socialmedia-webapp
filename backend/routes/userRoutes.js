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

router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching user details', error });
  }
});



router.post('/getFriends', async (req, res) => {
  try {
    const friendIds = req.body.friendIds;
    const friends = await User.find({ _id: { $in: friendIds } }, 'name'); // Only fetching the 'name' field
    res.status(200).send({ friends });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching friends', error });
  }
});


module.exports = router;
