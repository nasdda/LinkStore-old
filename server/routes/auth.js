require('dotenv').config()
var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken")

const User = require('../models/userModel')
const UserLinks = require('../models/userLinksModel')
const UserCollection = require('../models/userCollectionModel')

const { OAuth2Client } = require('google-auth-library');
const { collection } = require('../models/userModel');
const client = new OAuth2Client(process.env.CLIENT_ID)

router.post("/google-login",
  async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "No credentials" })
    }
    const jwtToken = req.headers.authorization.split(' ')[1]
    try {
      // verify google identity
      const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: process.env.CLIENT_ID,
      })
      const payload = ticket.getPayload()

      let user = await User.findOne({ email: payload.email })
      if (!user) {
        console.log('Creating new user...')
        user = new User({
          name: payload.name,
          email: payload.email,
          picture: payload.picture
        })
        await user.save()
        // Initial Collection
        userCollection = new UserCollection({
          userID: user.uuid,
          name: 'General',
          createdAt: Date.now()
        })
        await userCollection.save()
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