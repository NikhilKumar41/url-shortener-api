require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Health check route (for Jenkins monitoring)
app.get('/health', (req, res) => {
    res.status(200).send('API is healthy');
});