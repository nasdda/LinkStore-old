var express = require('express');
const mongoose = require('../mongo/mongo');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const userSchema = new mongoose.Schema({
    email: String
  })
  const User = mongoose.model('User', userSchema)
  const xin = new User({email: 'x300001y@gmail.com'})
  await xin.save()
  
  res.send('SUCCESS');
});

module.exports = router;
