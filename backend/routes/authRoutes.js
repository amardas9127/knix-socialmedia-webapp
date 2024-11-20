const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, username } = req.body;
    const newUser = new User({ name, email, phone, password, username });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessage = Object.values(err.errors).map((e) => e.message).join(", ");
      return res.status(400).send({ error: errorMessage });
    }
    if (err.code === 11000) {
      const duplicateKey = Object.keys(err.keyValue)[0];
      return res.status(400).send({ error: `User already exists.` });
    }
    res.status(500).send({ error: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).send({ error: "Invalid email or password" });
    res.status(200).send({
      message: "Login successful!",
      user: { _id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
