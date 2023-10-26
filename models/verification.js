const mongoose = require('mongoose')

const verificationSchema = new mongoose.Schema({
    // Owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Student',
    //     required: true
    // },
    owner: {
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

module.exports = mongoose.model('Verification', verificationSchema)