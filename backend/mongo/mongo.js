const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => {console.log("Database connection successful")})
.catch(err => {console.log("Database connection error\n", err)})

module.exports = mongoose



