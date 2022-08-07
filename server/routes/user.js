require('dotenv').config()
var express = require('express');
var router = express.Router();
var session = require('express-session')
const { OAuth2Client } = require('google-auth-library')
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);

const User = require('../models/userModel')
const UserLinks = require('../models/userLinksModel')


/* GET current user. */
router.get('/', async function (req, res) {
  return res.json({
    user: req.user,
  })
});

/* GET links of user with given uuid*/
router.get('/links/:uuid', async (req, res) => {
  if (req.params.uuid != req.user.uuid) {
    return res.status(401).json({ message: "Not permitted to view the particular links" })
  }
  userLinks = UserLinks.findOne({ uuid: req.params.uuid })
  return res.status(200).json({ links: userLinks.links })
})

router.post('/link', async (req, res) => {
  try {
    await UserLinks.updateOne(
      { uuid: req.user.uuid },
      { $push: { links: req.body.link } },
    )
    return res.json({ success: true })
  } catch (err) {
    return res.json({ success: false })
  }


})


/* POST logout of current user*/
router.post('/logout', (req, res) => {
  res.cookie('jwt', 'none', {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  })
  return res.status(200).json({ message: "User logged out" })
})


module.exports = router;



