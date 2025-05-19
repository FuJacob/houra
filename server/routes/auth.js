require("dotenv").config();
const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken").default; // Corrected import
router.get("/test", (req, res) => {
  res.send("Hello");
});

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const data = req.body;
    const hashedPassword = await bcrypt.hash(data.password, salt);
    console.log(hashedPassword);

    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    user.save();
    res.status(201).json({ message: "Successfully added User" });
  } catch (error) {
    res.status(500).json({
      message: "Error with signing up.",
      error: error,
    });
  }
});

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

router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const userExists = await User.findOne({ email: data.email });
    console.log(userExists);
    if (userExists) {
      console.log(userExists.password);
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        userExists.password
      );
      console.log(passwordMatch);
      if (passwordMatch) {
        // creat the JWT
        const user = { name: userExists.name, email: data.email };
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

router.post("/logout", (req, res) => {
  try {
    localStorage.removeItem("accessToken");
    return res.status(200).json({ message: "Sucessfully Logged out" });
  } catch (error) {
    return res.status(500).send("Error bro");
  }
});
module.exports = router;
