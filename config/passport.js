// load strategies
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google').Strategy;

// load the user model
var User = require('../models/user');

// load the strategy configs
var configAuth = require('./auth');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // ======================================================
    // Facebook strategy ====================================
    // ======================================================

    passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },

    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err) return done(err);

                if (user) {
                    // if the user is found, then log them in
                    return done(null, user);
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err) throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    // ======================================================
    // Twitter strategy =====================================
    // ======================================================

    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
    },

    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            // find the user in the database from their twitter id
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                if (err) return done(err);

                if (user) {
                    // if the user is found then log them in
                    return done(null, user);
                } else {
                    // if there is no user, create them
                    var newUser = new User();

                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err) throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));


    // ======================================================
    // Google strategy ======================================
    // ======================================================

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        returnURL: configAuth.googleAuth.returnURL,
    },

    function(identifier, profile, done) {
        process.nextTick(function() {
            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err) return done(err);

                if (user) {
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();

                    // set all of the relevant information
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;

                    // save the user
                    newUser.save(function(err) {
                        if (err)throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
