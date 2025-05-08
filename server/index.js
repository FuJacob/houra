require("dotenv").config();
const express = require("express");
const connectDB = require("./db.js");
const app = express();

connectDB();

app.listen(4500, () => {
  console.log("Server is now running on port 4500");
});
