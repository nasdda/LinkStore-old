require('dotenv').config()
var express = require('express');
var router = express.Router();
var session = require('express-session')
const {OAuth2Client} = require('google-auth-library')
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

const User = require('../models/userModel')


/* GET users listing. */
router.get('/', async function(req, res) {
  User.findOne({email: req.body.email}, function (err, foundUser) {
      if(err) return res.status(404).send('User not found')
      console.log(foundUser)
      res.send('Found User')
  })
  res.send('User Not Found')
});


module.exports = router;



  