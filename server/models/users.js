const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accounts: [
    {
      id: { type: Number, required: true },
      account_name: { type: String, required: true },
      account_balance: { type: Number, required: true },
      reload_freq: { type: String, required: true },
      last_reload: { type: Number, required: true },
      reloadAmount: { type: Number, required: true },
      colour: { type: String, required: true },
      type: { type: String, required: true },
      transactions: [
        {
          duration: { type: Number, required: true },
          start_time: { type: Number, required: true },
          end_time: { type: Number, required: true },
        },
      ],
    },
  ],
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
