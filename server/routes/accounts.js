// Load environment variables from .env file
require("dotenv").config();
// Import express framework
const express = require("express");
// Import Mongoose User model
const User = require("../models/users");
// Create a new router instance
const router = express.Router();
// Import mongoose for database interaction (used implicitly)
const mongoose = require("mongoose");
// Import JSON Web Token package to verify tokens
const jwt = require("jsonwebtoken");
// Import JWT authentication middleware
const authenticateToken = require("../middleware/authenticateToken").default;
const generateAccountNumber =
  require("./utils/generateAccountNumber.tsx").default;
const reloadMap = require("./utils/reloadMap.ts").default;
router.get("/getAccount", authenticateToken, async (req, res) => {
  // GET /getAccount - Retrieves a specific account by accountNumber for the authenticated user
  try {
    // Extract email from JWT-authenticated user
    const accountNumber = req.params.accountNumber;
    // Query the database for user data
    const user = await User.findOne({ email: email }).select("accounts");
    // Handle case where user or account is not found
    if (!user) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "User not found." });
    }
    const account = user.accounts.find(
      (acc) => acc.accountNumber === accountNumber
    );
    // Handle case where user or account is not found
    if (!account) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "Account not found." });
    }
    // Return appropriate success or error response
    res.status(200).json({ account });
  } catch (error) {
    // Return appropriate success or error response
    res.status(500).json({
      message: "Error with getting account.",
      error: error,
    });
  }
});
router.get("/getAccounts", authenticateToken, async (req, res) => {
  // GET /getAccounts - Retrieves all accounts for the authenticated user
  try {
    // Extract email from JWT-authenticated user
    const email = req.user.email;
    // Query the database for user data
    const user = await User.findOne({ email: email });
    // Handle case where user or account is not found
    if (!user) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "User not found." });
    }
    const accounts = user.accounts;
    // Return appropriate success or error response
    res.status(200).json({ accounts });
  } catch (error) {
    // Return appropriate success or error response
    res.status(500).json({
      message: "Error with getting accounts.",
      error: error,
    });
  }
});
router.post("/addAccount", authenticateToken, async (req, res) => {
  // POST /addAccount - Adds a new account to the authenticated user's accounts list
  try {
    // Validate incoming account data
    const data = req.body; // Assuming req.json() is a custom method or middleware to parse JSON. Standard express uses req.body
    // Extract email from JWT-authenticated user
    const email = req.user.email;
    if (!data.accountName || data.accountBalance == null || !data.reloadFreq) {
      // Return appropriate success or error response
      return res.status(400).json({ message: "Missing account fields." });
    }

    let accountNumber;
    while (true) {
      const randomNumber = generateAccountNumber();

      const userExists = await User.findOne({
        "accounts.accountNumber": randomNumber,
      });
      if (!userExists) {
        accountNumber = randomNumber;
        break;
      }
    }

    const newAccount = {
      accountNumber: accountNumber,
      accountName: data.accountName,
      accountBalance: data.accountBalance, // Make sure 'balance' is the correct field name from the request
      reloadFreq: data.reloadFreq,
      colour: data.colour, // Add this line
      type: data.type, // Add this line
    };

    // Query the database for user data
    // Find the user by email and add the new account to the accounts array
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Find user by email
      { $push: { accounts: newAccount } }, // Push the new account into the 'accounts' array
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );

    // Handle case where user or account is not found
    if (!updatedUser) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "User not found." });
    }

    // Return appropriate success or error response
    res.status(200).json({
      message: "Account added successfully.",
      user: updatedUser,
    });
  } catch (error) {
    // Return appropriate success or error response
    res.status(500).json({
      message: "Error with adding account.",
      error: error,
    });
  }
});

router.delete("/deleteAccount", authenticateToken, async (req, res) => {
  // DELETE /deleteAccount - Deletes an account by accountName for the authenticated user
  try {
    // Extract email from JWT-authenticated user
    const email = req.user.email;
    const { accountName } = req.body; // Assuming the account name is sent in the request body
    if (!accountName) {
      // Return appropriate success or error response
      return res.status(400).json({ message: "Missing account name." });
    }
    // Query the database for user data
    const user = await User.findOne({ email: email });
    // Handle case where user or account is not found
    if (!user) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "User not found." });
    }
    // Check if account exists in user's accounts list
    const accountExists = user.accounts.some(
      (acc) => acc.accountName === accountName
    );
    // Handle case where user or account is not found
    if (!accountExists) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "Account not found." });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { accounts: { accountName: accountName } } },
      { new: true, runValidators: true } // Options: return the updated document and run schema validators
    );

    // Return appropriate success or error response
    res.status(200).json({
      message: "Account deleted successfully.",
      user: updatedUser,
    });
  } catch (error) {
    // Return appropriate success or error response
    res.status(500).json({
      message: "Error with deleting account.",
      error: error,
    });
  }
});
// Export the router to be used in server configuration
router.patch("/updateAccount", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const {
      accountNumber,
      accountBalance,
      accountName,
      reloadFreq,
      colour,
      type,
    } = req.body;

    if (!accountNumber) {
      return res.status(400).json({ message: "Missing account number." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const account = user.accounts.find(
      (acc) => acc.accountNumber == accountNumber
    );

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Update only provided fields
    if (accountBalance != null) account.accountBalance = accountBalance;
    if (accountName) account.accountName = accountName;
    if (reloadFreq) account.reloadFreq = reloadFreq;
    if (colour) account.colour = colour;
    if (type) account.type = type;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Account updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error with updating account.",
      error: error.message,
    });
  }
});

router.patch("/asd", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const users = await User.find();

    for (const user of users) {
      let changed = false;

      user.accounts.forEach((acc) => {
        console.log("acc", acc);

        if (!acc.transactions) {
          acc.transactions = [];
          console.log("transactions added", acc);
          changed = true;
        }
      });

      if (changed) await user.save();
    }

    return res.status(200).json({
      message: "Accounts updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error with updating account balance.",
      error: error.message,
    });
  }
});

router.patch("/addAccountTransaction", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const { accountNumber, startTime, endTime, duration } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const account = user.accounts.find(
      (acc) => acc.accountNumber == accountNumber
    );

    if (!account) {
      return res.status(400).json({ message: "Account not found." });
    }

    account.transactions.push({
      startTime: startTime,
      endTime: endTime,
      duration: duration,
    });

    const updatedUser = await user.save();
    return res.status(200).json({
      message: "Account transaction added successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error with adding account transaction.",
      error: error.message,
    });
  }
});

router.patch("/reloadAccounts", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    const currentTime = new Date().getTime();
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.accounts.forEach((acc) => {
      const reloadInterval = reloadMap.get(acc.reloadFreq);
      if (currentTime - lastReload >= reloadInterval) {
        acc.accountBalance = acc.accountBalance + acc.reloadAmount;
        acc.lastReload = currentTime;
      }
    });
    const updatedUser = await user.save();
    return res.status(200).json({
      message: "Accounts reloaded successfully.",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error with reloading accounts.",
      error: error.message,
    });
  }
});

router.post("/generateMockAccounts", authenticateToken, async (req, res) => {
  // POST /generateMockAccounts - Generates 8 mock timer activities for the authenticated user
  try {
    const email = req.user.email;
    const currentTime = new Date().getTime();

    // Mock data arrays for generating realistic timer activities
    const activityNames = [
      "Deep Work Session",
      "Exercise & Fitness",
      "Reading Time",
      "Meditation & Mindfulness",
      "Creative Writing",
      "Learning & Study",
      "Project Planning",
      "Social Media Break",
    ];

    const activityTypes = [
      "work",
      "health",
      "learning",
      "break",
      "creative",
      "planning",
    ];
    const reloadFrequencies = [
      "hourly",
      "12hourly",
      "daily",
      "weekly",
      "monthly",
      "yearly",
    ];
    const colours = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
    ];

    const mockActivities = [];

    // Generate 8 mock timer activities
    for (let i = 0; i < 8; i++) {
      // Generate unique account number (activity ID)
      let accountNumber;
      while (true) {
        const randomNumber = generateAccountNumber();
        const userExists = await User.findOne({
          "accounts.accountNumber": randomNumber,
        });
        if (!userExists) {
          accountNumber = randomNumber;
          break;
        }
      }

      const mockActivity = {
        accountNumber,
        accountName: activityNames[i],
        accountBalance: Math.floor(Math.random() * 7200000) + 1800000, // 30 minutes to 2 hours in milliseconds
        reloadFreq:
          reloadFrequencies[
            Math.floor(Math.random() * reloadFrequencies.length)
          ],
        lastReload: currentTime - Math.floor(Math.random() * 86400000), // Within last 24 hours
        reloadAmount: Math.floor(Math.random() * 3600000) + 900000, // 15 minutes to 1 hour in milliseconds
        colour: colours[i],
        type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
        transactions: [], // Empty array as requested
      };

      mockActivities.push(mockActivity);
    }

    // Add all mock activities to the user
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $push: { accounts: { $each: mockActivities } } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "8 mock timer activities generated successfully.",
      activitiesAdded: mockActivities.length,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error generating mock timer activities.",
      error: error.message,
    });
  }
});

// Delete all user documents endpoint
router.delete("/deleteAllAccounts", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    user.accounts = [];
    await user.save();
    return res
      .status(200)
      .json({ message: "All accounts removed successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user documents.",
      error: error.message,
    });
  }
});

module.exports = router;
