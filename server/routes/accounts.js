require("dotenv").config();
const express = require("express");
const User = require("../models/users");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authenticateToken").default;
router.post("/addAccount", authenticateToken, async (req, res) => {
  try {
    const data = req.body; // Assuming req.json() is a custom method or middleware to parse JSON. Standard express uses req.body
    const email = req.user.email;
    const newAccount = {
      accountName: data.accountName,
      accountBalance: data.accountBalance, // Make sure 'balance' is the correct field name from the request
      reloadFreq: data.reloadFreq,
    };

    // Find the user by email and add the new account to the accounts array
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Find user by email
      { $push: { accounts: newAccount } }, // Push the new account into the 'accounts' array
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Account added successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error with adding account.",
      error: error,
    });
  }
});

router.delete("/deleteAccount", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const { accountName } = req.body; // Assuming the account name is sent in the request body

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { accounts: { accountName: accountName } } },
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({
      message: "Account deleted successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error with deleting account.",
      error: error,
    });
  }
});
module.exports = router;
