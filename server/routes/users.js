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


router.post('/auth/google', async function(req, res) {
  const {tokens} = await oAuth2Client.getToken(req.body.code)
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.CLIENT_ID
  })
  const payload = ticket.getPayload()
  let exist = await User.exists({email: payload['email']})
  if(exist) {
    console.log("User exists")
    return res.status(200).json(tokens)
  } 
  const newUser = new User({email: payload['email']})
  await newUser.save()
  console.log("User created")
  res.status(201).json(tokens)
})

router.post('/auth/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); 
  res.json(credentials);
})

module.exports = router;



  