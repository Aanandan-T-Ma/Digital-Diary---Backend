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
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "once"
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