const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Add friend
router.post("/add-friend", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).send({ error: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).send({ error: "Already friends" });
    }

    user.friends.push(friendId);
    await user.save();

    friend.friends.push(userId);
    await friend.save();

    res.status(200).send({ message: "Friend added successfully!" });
  } catch (err) {
    console.error("Error adding friend:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Remove friend
router.post("/remove-friend", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    await User.findByIdAndUpdate(friendId, {
      $pull: { friends: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });

    res.status(200).send({ message: "Friend removed successfully" });
  } catch (err) {
    console.error("Error removing friend:", err);
    res.status(500).send({ error: "Failed to remove friend" });
  }
});

module.exports = router;
