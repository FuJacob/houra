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
const generateid = require("./utils/generateid.tsx").default;
const reloadMap = require("./utils/reloadMap.ts").default;
router.get("/getAccount", authenticateToken, async (req, res) => {
  // GET /getAccount - Retrieves a specific account by id for the authenticated user
  try {
    // Extract email from JWT-authenticated user
    const id = req.params.id;
    // Query the database for user data
    const user = await User.findOne({ email: email }).select("accounts");
    // Handle case where user or account is not found
    if (!user) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "User not found." });
    }
    const account = user.accounts.find((acc) => acc.id === id);
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
    if (
      !data.account_name ||
      data.account_balance == null ||
      !data.reload_freq
    ) {
      // Return appropriate success or error response
      return res.status(400).json({ message: "Missing account fields." });
    }

    let id;
    while (true) {
      const randomNumber = generateid();

      const userExists = await User.findOne({
        "accounts.id": randomNumber,
      });
      if (!userExists) {
        id = randomNumber;
        break;
      }
    }

    const newAccount = {
      id: id,
      account_name: data.account_name,
      account_balance: data.account_balance, // Make sure 'balance' is the correct field name from the request
      reload_freq: data.reload_freq,
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
  // DELETE /deleteAccount - Deletes an account by account_name for the authenticated user
  try {
    // Extract email from JWT-authenticated user
    const email = req.user.email;
    const { account_name } = req.body; // Assuming the account name is sent in the request body
    if (!account_name) {
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
      (acc) => acc.account_name === account_name
    );
    // Handle case where user or account is not found
    if (!accountExists) {
      // Return appropriate success or error response
      return res.status(404).json({ message: "Account not found." });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { accounts: { account_name: account_name } } },
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
    const { id, account_balance, account_name, reload_freq, colour, type } =
      req.body;

    if (!id) {
      return res.status(400).json({ message: "Missing account number." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const account = user.accounts.find((acc) => acc.id == id);

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    // Update only provided fields
    if (account_balance != null) account.account_balance = account_balance;
    if (account_name) account.account_name = account_name;
    if (reload_freq) account.reload_freq = reload_freq;
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
    const { id, start_time, end_time, duration } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const account = user.accounts.find((acc) => acc.id == id);

    if (!account) {
      return res.status(400).json({ message: "Account not found." });
    }

    account.transactions.push({
      start_time: start_time,
      end_time: end_time,
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
      const reloadInterval = reloadMap.get(acc.reload_freq);
      if (currentTime - last_reload >= reloadInterval) {
        acc.account_balance = acc.account_balance + acc.reloadAmount;
        acc.last_reload = currentTime;
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
    const reload_frequencies = [
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
      let id;
      while (true) {
        const randomNumber = generateid();
        const userExists = await User.findOne({
          "accounts.id": randomNumber,
        });
        if (!userExists) {
          id = randomNumber;
          break;
        }
      }

      const mockActivity = {
        id,
        account_name: activityNames[i],
        account_balance: Math.floor(Math.random() * 7200000) + 1800000, // 30 minutes to 2 hours in milliseconds
        reload_freq:
          reload_frequencies[
            Math.floor(Math.random() * reload_frequencies.length)
          ],
        last_reload: currentTime - Math.floor(Math.random() * 86400000), // Within last 24 hours
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
