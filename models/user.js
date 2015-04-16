var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    facebook : {
        id : String,
        token : String,
        name : String
    },
    twitter : {
        id : String,
        token : String,
        displayName : String,
        username : String
    },
    google : {
        id : String,
        token : String,
        name : String
    }
});

module.exports = mongoose.model('User', userSchema);
