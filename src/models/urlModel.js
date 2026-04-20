// Import mongoose
const mongoose = require('mongoose');

// Create schema
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Export model
module.exports = mongoose.model('Url', urlSchema);