// Import required things
const Url = require('../models/urlModel');
// Import nanoid 
const { nanoid } = require('nanoid');

// -----------------------------
// CREATE SHORT URL
// -----------------------------
exports.createShortUrl = async (req, res) => {
    try {
        // Get original URL from request body
        const { originalUrl } = req.body;

        // Generate unique short code (6 characters)
        const shortCode = nanoid(6);

        // Create new record in DB
        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        // Save in database
        await newUrl.save();

        // Send response back
        res.json({
            shortUrl: `http://localhost:3000/${shortCode}`
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating short URL" });
    }
};

// -----------------------------
// REDIRECT TO ORIGINAL URL
// -----------------------------
exports.redirectUrl = async (req, res) => {
    try {
        // Get short code from URL params
        const { shortCode } = req.params;

        // Find matching URL in DB
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).send("URL not found");
        }

        // Increase click count
        url.clicks += 1;
        await url.save();

        // Redirect user to original URL
        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).send("Server Error");
    }
};

// -----------------------------
// GET ANALYTICS
// -----------------------------
exports.getAnalytics = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ message: "Not found" });
        }

        // Send analytics data
        res.json({
            originalUrl: url.originalUrl,
            clicks: url.clicks,
            createdAt: url.createdAt
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics" });
    }
};