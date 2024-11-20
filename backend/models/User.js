const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, maxLength: 10 },
  password: { type: String, required: true, maxLength: 10 },
  username: { type: String, required: true, unique: true },
  friends: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  posts: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
  recentchats: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
