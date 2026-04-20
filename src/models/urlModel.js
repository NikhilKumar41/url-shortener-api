// Import mongoose to define schema
const mongoose = require('mongoose');

// Create schema (structure of data in DB)
const urlSchema = new mongoose.Schema({
    
    // Original long URL
    originalUrl: {
        type: String,
        required: true
    },

    // Short unique code (like abc123)
    shortCode: {
        type: String,
        required: true,
        unique: true
    },

    // Number of times link is clicked
    clicks: {
        type: Number,
        default: 0
    },

    // Store creation time automatically
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export model so I can use it in controller
module.exports = mongoose.model('Url', urlSchema);