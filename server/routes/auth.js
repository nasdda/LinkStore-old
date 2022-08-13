require('dotenv').config()
var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken")

const User = require('../models/userModel')
const UserLinks = require('../models/userLinksModel')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

router.post("/google-login",
  async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "No credentials" })
    }
    const jwtToken = req.headers.authorization.split(' ')[1]
    console.log("JWT IS: ", jwtToken)
    try {
      // verify google identity
      const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: process.env.CLIENT_ID,
      })
      const payload = ticket.getPayload()
      console.log('google client payload: ', payload)

      let user = await User.findOne({ email: payload.email })
      if (!user) {
        console.log('Creating new user...')
        user = new User({
          name: payload.name,
          email: payload.email,
          picture: payload.picture
        })
        await user.save()
        links = new UserLinks({
          uuid: user.uuid
        })
        await links.save()
      }
      token = jwt.sign(
        { user: user },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "24h" }
      )
      res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 86400000 });
      res.status(200).json({
        success: true,
        jwt: token,
      })
    } catch (err) {
      console.log(err)
      res.json({
        success: false,
        message: error
      })
    }
  }
)


module.exports = router;