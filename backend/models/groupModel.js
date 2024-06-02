const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    groupname: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    meetingDay: {
        type: String,
        required: true
    },
    usersAssociated: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    meetingTime: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Group', groupSchema)