const mongoose = require("mongoose");
const short = require('short-uuid');

const schema = mongoose.Schema({
  uuid: { type: String, default: short.generate },
  name: { type: String },
  email: { type: String },
  picture: { type: String }
});

module.exports = mongoose.model("User", schema)