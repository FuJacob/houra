const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accounts: [
    {
      accountNumber: { type: Number, required: true },
      accountName: { type: String, required: true },
      accountBalance: { type: Number, required: true },
      reloadFreq: { type: String, required: true },
      colour: { type: String, required: true },
      type: { type: String, required: true },
      transactions: [
        {
          duration: { type: Number, required: true },
          startTime: { type: Number, required: true },
          endTime: { type: Number, required: true },
        },
      ],
    },
  ],
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
