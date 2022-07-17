const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: {type: String},
    name: {type: String},
    email: {type: String},
});

module.exports = mongoose.model("User", schema)