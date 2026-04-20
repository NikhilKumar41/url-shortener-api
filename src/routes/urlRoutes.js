const express = require('express');
const router = express.Router();

const {
    createShortUrl,
    redirectUrl,
    getAnalytics
} = require('../controllers/urlController');


// ===============================
// ROUTES
// ===============================

// Create short URL
router.post('/shorten', createShortUrl);

// Analytics
router.get('/analytics/:shortCode', getAnalytics);

// Redirect (IMPORTANT: keep this LAST)
router.get('/:shortCode', redirectUrl);

module.exports = router;