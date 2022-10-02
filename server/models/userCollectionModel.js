const mongoose = require("mongoose");
const short = require('short-uuid');

const schema = mongoose.Schema({
  userID: { type: String },
  uuid: { type: String, default: short.generate },
  name: {type: String},
  createdAt: {type: Number},
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
  },
  public: { type: Boolean, default: false } 
});

module.exports = mongoose.model("User Collection", schema)