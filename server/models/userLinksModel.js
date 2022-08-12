const mongoose = require("mongoose");

const schema = mongoose.Schema({
  uuid: { type: String },
  links: {
    type: [{
      url: String,
      title: String,
      description: String
    }],
    default: []
  }
});

module.exports = mongoose.model("User Links", schema)