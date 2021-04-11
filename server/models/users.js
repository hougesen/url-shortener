const mongoose = require("mongoose");

const users = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Users = mongoose.model("Users", users);
module.exports = Users;
