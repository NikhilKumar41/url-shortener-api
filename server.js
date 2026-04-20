// Import express
const express = require('express');
const app = express();

// Import dotenv (for env variables like Mongo URI)
require('dotenv').config();

// Import mongoose (for MongoDB)
const mongoose = require('mongoose');

// Import routes
const urlRoutes = require('./src/routes/urlRoutes');

// Middleware to read JSON
app.use(express.json());

// Home route (just for browser)
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});

// ===============================
// ✅ HEALTH ROUTE (VERY IMPORTANT)
// ===============================
app.get('/health', (req, res) => {
    res.send('API is healthy');
});


// ===============================
// ✅ CONNECT TO MONGODB
// ===============================
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


// ===============================
// ✅ MAIN ROUTES
// ===============================
app.use('/', urlRoutes);


// ===============================
// START SERVER
// ===============================
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});