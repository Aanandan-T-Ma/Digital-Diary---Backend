const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    once: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Event', eventSchema)