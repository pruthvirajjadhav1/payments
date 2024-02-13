const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String
    },
    firstname:{
        required: true,
        type: String
    },
    lastname:{
        required: true,
        type: String
    }
});


const accountsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        required: true,
        type: Number
    }

});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountsSchema);

module.exports = {User, Account};
