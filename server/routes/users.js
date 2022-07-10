var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
  res.send("At Users")
});

router.post('/', async function(req, res, next) {
  const userSchema = new mongoose.Schema({
    email: String
  })
  const User = mongoose.model('User', userSchema)
  const xin = new User({email: req.body.email})
  await xin.save()
})

module.exports = router;
