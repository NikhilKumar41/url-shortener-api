// Import model
const Url = require('../models/urlModel');

// Import nanoid
const nanoid = require('nanoid').nanoid;


// ===============================
// CREATE SHORT URL
// ===============================
exports.createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        // Generate short code
        const shortCode = nanoid(6);

        // Save in DB
        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        await newUrl.save();

        // Send short URL
        res.json({
            shortUrl: `http://localhost:3000/${shortCode}`
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating short URL" });
    }
};


// ===============================
// REDIRECT
// ===============================
exports.redirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).send("URL not found");
        }

        url.clicks++;
        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).send("Server Error");
    }
};


// ===============================
// ANALYTICS
// ===============================
exports.getAnalytics = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ message: "Not found" });
        }

        res.json({
            originalUrl: url.originalUrl,
            clicks: url.clicks,
            createdAt: url.createdAt
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics" });
    }
};