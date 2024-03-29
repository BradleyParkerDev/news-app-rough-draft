const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

const following = {
    categories:[],
    sources:[],
    countries:[],
    topics:[]

}


const userSchema = new mongoose.Schema({
    id:{type:String, default: uuidv4},
    firstName: String,
    lastName: String,
    emailAddress: String,
    password: String,
    following: following,
    readLater: {},
    refreshTokens: []
});


const User = mongoose.model('users', userSchema);

module.exports = User;