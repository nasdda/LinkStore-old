require('dotenv').config()
var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode")

const User = require('../models/userModel')
const UserLinks = require('../models/userLinksModel')


router.post("/google-login",
  async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(403).json({ error: "No credentials" })
    }
    const jwtToken = req.headers.authorization.split(' ')[1]
    console.log("JWT IS: ", jwtToken)
    try {
      let payload = jwt_decode(jwtToken)
      let user = await User.findOne({ email: payload.email });
      if (!user) {
        console.log('Creating new user...');
        user = new User({
          name: payload.name,
          email: payload.email,
          picture: payload.picture
        });
        await user.save()
        links = new UserLinks({
          uuid: user.uuid
        })
        await links.save()
      }
      jwt.sign(
        { user: user },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3h" },
        (err, token) => {
          if (err) {
            return res.json({
              success: false,
              message: err
            });
          }
          res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });
          res.status(200).json({
            success: true,
            jwt: token,
          });
        }
      )
    } catch (err) {
      console.log(err)
      res.json({
        success: false,
        message: error
      })
    }
  }
);


module.exports = router;