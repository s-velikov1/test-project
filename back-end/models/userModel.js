const mongoose = require('mongoose');

// UserName, Email, PhoneNumber, Events Count, Next Event Date
const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    eventsCount: {
        type: Number,
        default: 0
    },
    nextEventDate: {
        type: Date,
        default: null
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;