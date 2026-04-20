const express = require('express');
const router = express.Router();

// Import controller functions
const {
    createShortUrl,
    redirectUrl,
    getAnalytics
} = require('../controllers/urlController');

// Route to create short URL
router.post('/shorten', createShortUrl);

// Route to redirect
router.get('/:shortCode', redirectUrl);

// Route to get analytics
router.get('/analytics/:shortCode', getAnalytics);

module.exports = router;