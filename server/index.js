require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const app = express();
const User = require("./models/users");
const authRoutes = require("./routes/auth");
const accountsRoutes = require("./routes/accounts");
const cors = require("cors");
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountsRoutes);
app.listen(4500, () => {
  console.log("Server is now running on port 4500");
});
