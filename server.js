var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var configDB = require('./config/database.js');

// configuration ======================================

// connect to mongo
mongoose.connect(configDB.url);

require('./config/passport')(passport);

// setup the express app
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app')
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({
    secret: 'asdkjhgdjasgt8217360914hgkjfgsd',
    store: new MongoStore({
        url : configDB.url
    }),
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// serve static content
app.use(express.static(__dirname + '/app'));

// routes
require('./routes.js')(app, passport);

// launch
app.listen(port);
console.log('The magic happens on port ' + port);
