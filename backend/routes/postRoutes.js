const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path to your model

// Route to add a post
router.post('/addPost', async (req, res) => {
  try {
    const { userId, imageUrl, caption } = req.body;

    // Find the user by userId and add the new post
    const user = await User.findById(userId);
    const username = user.username;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the new post to the posts array
    user.posts.push({ imageUrl, caption,username, });

    // Save the user with the new post
    await user.save();

    return res.status(200).json({ message: 'Post added successfully', user });
  } catch (error) {
    console.error('Error adding post:', error);
    return res.status(500).json({ message: 'Error adding post', error });
  }
});

router.get('/getpost', async (req, res) => {
  try {
    const userId = req.query.userId; // Access userId from query parameters
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId); // Fetch the user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ posts: user.posts }); // Send back the posts array
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
module.exports = router;
