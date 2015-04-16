# node-social-auth
This is a boilerplate Node.js app, which provides simple authentication with Facebook, Twitter and Google. It uses Express, Passport and MongoDB for storing sessions.

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
