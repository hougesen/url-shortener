const mongoose = require("mongoose");

const links = new mongoose.Schema({
  userId: {
    type: String,
    default: null,
  },
  shortCode: {
    type: String,
  },
  link: {
    type: String,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

const Links = mongoose.model("Links", links);
module.exports = Links;
