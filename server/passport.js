require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('./models/userModel')
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
var passport = require("passport");

var cookieExtractor = function(req) { 
    var token = null; 
    if (req && req.cookies) token = req.cookies['jwt']; 
    return token; 
};

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET_KEY
}, function(jwt_payload, done) {
    console.log(JSON.stringify(jwt_payload.user))
    User.findOne({email: jwt_payload.user.email}, async function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

passport.serializeUser( (user, done) => { 
    done(null, user)
} )

passport.deserializeUser((user, done) => {
    done(null, user)
}) 

module.exports = passport