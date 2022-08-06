require('dotenv').config()
var express = require('express');
var router = express.Router();

var passport = require('../passport')
const jwt = require("jsonwebtoken")

router.get(
    "/google",
    passport.authenticate('google', { scope: ["email", "profile"] })
);

router.get(
    "/google/callback",
    passport.authenticate('google', { 
        successRedirect: "http://localhost:3000/",
        failureRedirect: "/login/failed"
    }),
);

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        message: "Failed to log in"
    })
})

router.get('/login/success', (req, res) => {
    console.log(req.user)
    if (req.user) {
        jwt.sign(
            { user: req.user },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3h" },
            (err, token) => {
                if (err) {
                    return res.json({
                        success: false,
                        jwt: null,
                    });
                }
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({
                    success: true,
                    jwt: token,
                });
            }
        )
    } else {
        res.json({
            success: false,
            jwt: null
        })
    }
})

module.exports = router;