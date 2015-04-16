# node-social-auth
Boilerplate app with social auth in Node.js. Uses express, passport, mongo.

<h2>How to setup</h2>

1. Install dependencies:

<code>npm install</code>

2. Configue social login in config/auth.js:

<code>
module.exports = {
    'facebookAuth' : {
        clientID: '',
        clientSecret: '',
        callbackURL: ''
    },
    'twitterAuth' : {
        consumerKey: '',
        consumerSecret: '',
        callbackURL: ''
    },
    'googleAuth' : {
        clientID: '',
        clientSecret: '',
        returnURL: ''
    }
};
</code>

3. Configue Mongo from config/database.js:

<code>
module.exports = {
    'url' : ''
}
</code>
