const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userId : { type : String, require : true },
    password : { type : String, require : true },
    badgeId : { type : String, require : true },
    nick : { type : String, require : true },
    fullName : { type : String, require : true }
});

module.exports = mongoose.model('User', userSchema, 'users');