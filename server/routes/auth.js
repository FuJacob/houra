// Load environment variables from .env file
require("dotenv").config();
const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken").default; // Corrected import

// Test route to check server status
router.get("/test", (req, res) => {
  res.send("Hello");
});

// Route for user signup/registration
router.post("/signup", async (req, res) => {
  try {
    // Destructure required fields from request body
    const { email, password, name } = req.body;
    // Check for missing required fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user and save to database
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "Successfully added User" });
  } catch (error) {
    res.status(500).json({
      message: "Error with signing up.",
      error: error,
    });
  }
});

// Route to get current authenticated user info
router.get("/getUser", authenticateToken, async (req, res) => {
  try {
    const currentUser = req.user;
    console.log("CURRENT USER:", currentUser);

    res.status(200).json({
      message: "Successfully got user.",
      user: currentUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error with getting user.",
      error: error,
    });
  }
});

// Route for user login/authentication
router.post("/login", async (req, res) => {
  try {
    // Destructure required fields from request body
    const { email, password } = req.body;
    // Check for missing required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password." });
    }
    const userExists = await User.findOne({ email: email });
    console.log(userExists);
    if (userExists) {
      console.log(userExists.password);
      const passwordMatch = await bcrypt.compare(password, userExists.password);
      console.log(passwordMatch);
      if (passwordMatch) {
        // create the JWT
        const user = { name: userExists.name, email: email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        console.log("Success login, here is the JWT token: ", accessToken);
        return res
          .status(200)
          .json({ message: "Logged in succesfully", accessToken: accessToken });
      }
    }
    return res.status(500).json({ message: "User or password invalid." });
  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
});

// Route for user logout
router.post("/logout", (req, res) => {
  try {
    // Invalidate token on client side if applicable (e.g., by clearing it in localStorage or cookies)
    return res.status(200).json({ message: "Sucessfully Logged out" });
  } catch (error) {
    return res.status(500).send("Error bro");
  }
});

// Export the router to be used in main server file
module.exports = router;
