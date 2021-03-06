const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    activated: {
        type: Boolean
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', User)