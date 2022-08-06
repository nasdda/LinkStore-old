require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('./models/userModel')
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
var passport = require("passport");


passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOne({ id: profile.id });
            // if user exists return the user 
            if (existingUser) {
                return done(null, existingUser);
            }
            // if user does not exist create a new user 
            console.log('Creating new user...');
            const newUser = new User({
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            });
            await newUser.save();
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
    }
))

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(JSON.stringify(jwt_payload.user))
    User.findOne({id: jwt_payload.user.id}, async function(err, user) {
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