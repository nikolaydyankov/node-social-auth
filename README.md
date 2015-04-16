# node-social-auth
Boilerplate app with social auth in Node.js. Uses express, passport, mongo.

<h2>How to setup</h2>

<h3>Install dependencies:</h3>

<code>npm install</code>

<h3>Configue social login in config/auth.js:</h3>

```javascript
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
```

<h3>Configue Mongo from config/database.js:</h3>

```javascript
module.exports = {
    'url' : ''
}
```
