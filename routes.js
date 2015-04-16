var path = require('path');

module.exports = function(app, passport) {
    app.get('/', isLoggedIn, function(req, res) {
        // res.sendFile(path.join(__dirname + '/app/app.html'));
        res.render('app', { user: req.user });
    });

    app.get('/login', function(req, res) {
        res.sendFile(path.join(__dirname + '/app/login.html'));
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/auth/google', passport.authenticate('google', { scope : [ 'profile' ] }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

function isLoggedIn(req, res, next) {
    // if user is authenticated, continue on
    if (req.isAuthenticated()) {
        return next();
    }

    // if user is not authenticated, redirect to home page
    res.redirect('/login');
}
