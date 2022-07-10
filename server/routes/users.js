require('dotenv').config()
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library')
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

/* GET users listing. */
router.get('/', async function(req, res) {
  res.send("At Users")
});

router.post('/auth/google', async function(req, res) {
  const {tokens} = await oAuth2Client.getToken(req.body.code)
  console.log(tokens)
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.CLIENT_ID
  })
  const payload = ticket.getPayload()
  console.log(payload)
  res.json(tokens)
})

router.post('/auth/google/refresh-token', async (req, res) => {
  const user = new UserRefreshClient(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    req.body.refreshToken,
  );
  const { credentials } = await user.refreshAccessToken(); // optain new tokens
  res.json(credentials);
})

module.exports = router;



  // const userSchema = new mongoose.Schema({
  //   email: String
  // })
  // const User = mongoose.model('User', userSchema)
  // const xin = new User({email: req.body.email})
  // await xin.save()