const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model('Task', taskSchema)