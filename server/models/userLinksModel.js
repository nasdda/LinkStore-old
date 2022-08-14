const mongoose = require("mongoose");

const schema = mongoose.Schema({
  uuid: { type: String },
  links: {
    type: [{
      url: String,
      title: String,
      tags: [{
        label: String,
        backgroundColor: String
      }],
      description: String
    }],
    default: []
  },
  tags: {
    type: [{
      label: String,
      backgroundColor: String
    }]
  }
});

module.exports = mongoose.model("User Links", schema)