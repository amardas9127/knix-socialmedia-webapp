const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://amardas9127:amar@cluster0.nfroz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster)", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Routes
app.use("/api", authRoutes); // Authentication routes
app.use("/api", userRoutes); // User search routes
app.use("/api", friendRoutes); // Friend-related routes
app.use("/api", postRoutes); // Friend-related routes
