require('dotenv').config()
var express = require('express');
var router = express.Router();

var passport = require('../passport')
const jwt = require("jsonwebtoken")

const User = require('../models/userModel')

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
router.post(
    "/google-login",
    async (req, res) => {
        const idToken = req.body.token
        console.log("GOT TOKEN: ", idToken)
        try {
            const ticket = await client.verifyIdToken({
                idToken: idToken,
                audience: process.env.CLIENT_ID
            })
            payload = ticket.getPayload()
            console.log(payload)
            let user = await User.findOne({ email: payload.email });
            if (!user) {
                console.log('Creating new user...');
                user = new User({
                    name: payload.name,
                    email: payload.email
                });
                await user.save();
            }
            jwt.sign(
                { user: user },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "3h" },
                (err, token) => {
                    if (err) {
                        return res.json({err});
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
            res.json(err)
        }
    }
);




module.exports = router;