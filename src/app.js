require('dotenv').config(); // <-- this fixes your issue

const express = require('express');
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(express.json());

// Connect to MongoDB using .env variable
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use('/', urlRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('URL Shortener API Running');
});

// -----------------------------
// HEALTH CHECK ENDPOINT
// -----------------------------
app.get('/health', (req, res) => {
    // This route is used to check if app is running
    res.status(200).json({
        status: "UP",
        message: "Application is running"
    });
});

module.exports = app;