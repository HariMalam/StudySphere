const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    publication: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    username: {
        type: String,
        required: true,
    },
    
},{ timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
