const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    creditCard: {
        type: String,
        required: true,
        unique: true
    },
    debitCard: {
        type: String,
        required: true,
        unique: true
    }
})



module.exports = mongoose.model('User', userSchema); // User is the name of the collection in the database