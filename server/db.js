require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
    mongoose
      .connect(process.env.MONGODB_URI)
      .then((result) => console.log("MONGODB Connected"));
  } catch (error) {
    console.log("ERROR WITH CONNECTING TO MONGODB", error);
  }
};

module.exports = connectDB;
